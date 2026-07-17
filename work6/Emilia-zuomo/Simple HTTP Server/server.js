const Koa = require('koa');
const Router = require('@koa/router');
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static');
const multer = require('@koa/multer');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const iconv = require('iconv-lite');

const db = require('./db');
const { generateToken, authMiddleware } = require('./auth');

const app = new Koa();
const router = new Router();
const upload = multer({ dest: path.join(__dirname, 'uploads') });

function normalizeOriginalName(name = '') {
  if (!name) return name;

  const latin1Buffer = Buffer.from(name, 'latin1');
  const utf8Text = latin1Buffer.toString('utf8');

  if (!utf8Text.includes('�')) {
    return utf8Text;
  }

  const gbkText = iconv.decode(latin1Buffer, 'gbk');
  return gbkText && !gbkText.includes('�') ? gbkText : utf8Text;
}

// 确保 uploads 目录存在
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

// ========== 全局中间件 ==========
app.use(bodyParser());
app.use(serve(path.join(__dirname, 'public'))); // 静态文件服务
app.use(serve(path.join(__dirname, 'uploads'))); // 暴露上传目录用于直接访问

// 1. 登录接口 (Bonus: 鉴权)
router.post('/api/login', async (ctx) => {
  const { username, password } = ctx.request.body;
  const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    ctx.status = 401;
    ctx.body = { error: '用户名或密码错误' };
    return;
  }
  ctx.body = { token: generateToken(user), username: user.username };
});

// 2. 上传文件 (需要鉴权)
router.post('/api/upload', authMiddleware(), upload.single('file'), async (ctx) => {
  if (!ctx.file) {
    ctx.status = 400;
    ctx.body = { error: '未选择文件' };
    return;
  }

  const rawOriginalName = ctx.file.originalname || '';
  const normalizedOriginalName = normalizeOriginalName(rawOriginalName);

  const ext = path.extname(normalizedOriginalName).toLowerCase();
  const baseName = path.basename(normalizedOriginalName, ext)
    .replace(/[^\w\u4e00-\u9fff-]+/g, '_')
    .replace(/^_+|_+$/g, '') || 'file';

  // 保留更易读的文件名，同时避免冲突
  const storedName = `${Date.now()}-${baseName}${ext}`;
  const newPath = path.join(uploadsDir, storedName);

  // 移动临时文件到最终路径
  fs.renameSync(ctx.file.path, newPath);

  // Bonus: 存入数据库
  db.prepare(
    'INSERT INTO files (original_name, stored_name, size, uploader_id) VALUES (?, ?, ?, ?)'
  ).run(normalizedOriginalName, storedName, ctx.file.size, ctx.state.user.id);

  ctx.body = {
    message: '上传成功',
    url: `/uploads/${storedName}`,
    originalName: normalizedOriginalName,
    size: ctx.file.size,
  };
});

// 3. 列出文件 (公开接口)
router.get('/api/files', async (ctx) => {
  const files = db.prepare(`
    SELECT
      id,
      original_name,
      stored_name,
      size,
      strftime('%Y-%m-%d %H:%M:%S', created_at, 'localtime') AS created_at
    FROM files
    ORDER BY files.created_at DESC
  `).all();

  // 添加访问 URL
  const result = files.map(f => ({
    ...f,
    url: `/uploads/${f.stored_name}`
  }));

  ctx.body = result;
});

// 4. 删除文件 (需要鉴权)
router.delete('/api/delete', authMiddleware(), async (ctx) => {
  const { filename } = ctx.request.body; // stored_name
  if (!filename) {
    ctx.status = 400;
    ctx.body = { error: '缺少 filename 参数' };
    return;
  }

  const file = db.prepare('SELECT * FROM files WHERE stored_name = ?').get(filename);
  if (!file) {
    ctx.status = 404;
    ctx.body = { error: '文件不存在' };
    return;
  }

  // 删除物理文件
  const filePath = path.join(uploadsDir, filename);
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

  // 删除数据库记录
  db.prepare('DELETE FROM files WHERE stored_name = ?').run(filename);

  ctx.body = { message: '删除成功' };
});

// 暴露 uploads 目录用于文件访问
app.use(router.routes()).use(router.allowedMethods());

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📁 Upload dir: ${uploadsDir}`);
  console.log(`👤 Default account: admin / admin123`);
});