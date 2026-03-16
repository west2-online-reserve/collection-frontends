
import Koa from 'koa';
import Router from 'koa-router';
import { koaBody } from 'koa-body';
import serveStatic from 'koa-static';
import mount from 'koa-mount';
import path from 'path';
import { promises as fs } from 'fs';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';
import crypto from 'crypto';
import { fileURLToPath } from 'url';


// ====================
// __dirname 得到文件路径
// ====================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ====================
// 配置区
// ====================
const JWT_SECRET = '2faa1ef763a2c4e616f68c2ec1087c72c24e25616ac7d2a2d2006c5e73e7aee2';

// MySQL 连接配置
const dbConfig = {
  host: 'localhost',
  port: 3306,
  user: 'manager',           
  password: 'zcx442938',    
  database: 'file_manager'
};

// ====================
// 初始化 MySQL 连接池
// ====================
let pool;
async function initMySQL() {
  pool = await mysql.createPool({
    host: dbConfig.host,
    port: dbConfig.port,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    charset: 'utf8mb4'
  });
  console.log('√ MySQL 连接池已创建');
}
await initMySQL().catch(err => {
  console.error('× 无法连接到 MySQL：', err.message);
  process.exit(1);
});

// ====================
// 确保 ./uploads 目录存在
// ====================
async function ensureUploadsDir() {
  const dir = path.join(__dirname, 'uploads');
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
    console.log('✅ 已创建 uploads/ 目录');
  }
}
await ensureUploadsDir();


// JWT 鉴权中间件
async function auth(ctx, next) {
  const authHeader = ctx.headers['authorization'];
  if (!authHeader) {
    ctx.status = 401;
    ctx.body = { error: '未提供 Authorization Header' };
    return;
  }
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    ctx.status = 401;
    ctx.body = { error: '无效的 Authorization 格式' };
    return;
  }
  const token = parts[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    ctx.state.user = payload.username; // 验证成功后，把用户名挂到 ctx.state.user
    await next();
  } catch {
    ctx.status = 401;
    ctx.body = { error: 'Token 无效或已过期' };
  }
}

// 生成唯一文件名（原名 + 时间戳 + 随机串 + 扩展名）
function makeUniqueFilename(originalName) {
  const ext = path.extname(originalName);            
  const base = path.basename(originalName, ext);      
  const timestamp = Date.now();                       
  const randomPart = crypto.randomBytes(4).toString('hex'); 
  return `${base}-${timestamp}-${randomPart}${ext}`;  
}

// ====================
// 应用与路由
// ====================
const app = new Koa();
const router = new Router();

router.get('/', async (ctx) => {
  ctx.redirect('/login.html');
});
// 静态文件服务
app.use(serveStatic(path.join(__dirname, 'public')));//把磁盘上 ./public 目录下的所有文件当作“根路径下的静态资源”暴露
app.use(mount('/uploads', serveStatic(path.join(__dirname, 'uploads'))));//把磁盘上 ./uploads 目录下的文件挂载到 URL 前缀 /uploads

// ====================
// API：用户注册 /api/register
// ====================
router.post(
  '/api/register',
  koaBody({ enableTypes: ['json'] }),
  async (ctx) => {
    try {
      const { username, password } = ctx.request.body || {};
      if (!username || !password) {
        ctx.status = 400;
        ctx.body = { error: '用户名和密码不能为空' };
        return;
      }

      // 检查用户名是否已存在
      const checkSql = `SELECT COUNT(*) AS cnt FROM users WHERE username = ?`;
      const [rows1] = await pool.execute(checkSql, [username]);
      if (rows1[0].cnt > 0) {
        ctx.status = 409;
        ctx.body = { error: '用户名已存在' };
        return;
      }

      // bcrypt 哈希密码
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(password, saltRounds);

      // 3. 插入到 users 表
      const insertSql = `
        INSERT INTO users (username, password_hash, created_at, role)
        VALUES (?, ?, NOW(), 'user')
      `;
      await pool.execute(insertSql, [username, passwordHash]);

      ctx.body = { message: '注册成功' };
    } catch (err) {
      ctx.status = 500;
      ctx.body = { error: '注册失败', details: err.message };
    }
  }
);

// ====================
// API：用户登录 /api/login
// ====================
router.post(
  '/api/login',
  koaBody({ enableTypes: ['json'] }),
  async (ctx) => {
    try {
      const { username, password } = ctx.request.body || {};
      if (!username || !password) {
        ctx.status = 400;
        ctx.body = { error: '用户名和密码不能为空' };
        return;
      }

      // 1. 从 DB 中取出该用户的 password_hash
      const querySql = `SELECT password_hash FROM users WHERE username = ? LIMIT 1`;
      const [rows2] = await pool.execute(querySql, [username]);
      if (rows2.length === 0) {
        ctx.status = 401;
        ctx.body = { error: '用户名或密码错误' };
        return;
      }
      const storedHash = rows2[0].password_hash;

      // 2. bcrypt 比对
      const match = await bcrypt.compare(password, storedHash);
      if (!match) {
        ctx.status = 401;
        ctx.body = { error: '用户名或密码错误' };
        return;
      }

      // 3. 签发 JWT（有效期 1 小时）
      const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
      ctx.body = { message: '登录成功', token };
    } catch (err) {
      ctx.status = 500;
      ctx.body = { error: '登录失败', details: err.message };
    }
  }
);

// ====================
// API：上传文件 /api/upload
// ====================
router.post(
  '/api/upload',
  auth,
  koaBody({
    multipart: true,
    formidable: {
      uploadDir: path.join(__dirname, 'uploads'),
      keepExtensions: true,
      maxFileSize: 200 * 1024 * 1024
    }
  }),
  async (ctx) => {
    try {
      const file = ctx.request.files?.file;
      if (!file) {
        ctx.status = 400;
        ctx.body = { error: '未检测到上传文件 (字段名须为 "file")' };
        return;
      }

      const tempPath     = file.filepath;
      const originalName = file.originalFilename;
      const fileSize     = file.size;

      if (typeof tempPath !== 'string' || !originalName) {
        throw new Error('无法读取文件路径或原始文件名');
      }

      const uniqueName = makeUniqueFilename(originalName);
      const targetPath = path.join(__dirname, 'uploads', uniqueName);

      try { await fs.unlink(targetPath); } catch { /* 忽略 */ }

      await fs.rename(tempPath, targetPath);

      const insertUploadSql = `
        INSERT INTO uploads
          (filename, original_filename, username, upload_time, size)
        VALUES (?, ?, ?, NOW(), ?)
      `;
      await pool.execute(insertUploadSql, [
        uniqueName,
        originalName,
        ctx.state.user,
        fileSize
      ]);

      const fileUrl = `/uploads/${encodeURIComponent(uniqueName)}`;
      ctx.body = {
        message: '上传成功',
        filename: uniqueName,
        original: originalName,
        url: fileUrl,
        size: fileSize
      };
    } catch (err) {
      ctx.status = 500;
      ctx.body = { error: '上传失败', details: err.message };
    }
  }
);

// ====================
// API：删除文件 /api/delete
// ====================
router.delete(
  '/api/delete',
  auth,
  koaBody({
    parsedMethods: ['DELETE'],
    enableTypes: ['json']
  }),
  async (ctx) => {
    try {
      const { filename } = ctx.request.body || {};
      if (!filename) {
        ctx.status = 400;
        ctx.body = { error: '请提供要删除的文件名' };
        return;
      }

      const filePath = path.join(__dirname, 'uploads', filename);
      try {
        await fs.access(filePath);
      } catch {
        ctx.status = 404;
        ctx.body = { error: '文件不存在' };
        return;
      }

      await fs.unlink(filePath);

      // 同步删除 MySQL 中的记录
      const deleteSql = `DELETE FROM uploads WHERE filename = ?`;
      await pool.execute(deleteSql, [filename]);

      ctx.body = { message: '删除成功', filename };
    } catch (err) {
      ctx.status = 500;
      ctx.body = { error: '删除失败', details: err.message };
    }
  }
);

// ====================
// API：列出文件 /api/files
// ====================
router.get('/api/files', async (ctx) => {
  try {
    const uploadDir = path.join(__dirname, 'uploads');
    const files = await fs.readdir(uploadDir);
    const list = files.map(name => ({
      filename: name,
      url: `/uploads/${encodeURIComponent(name)}`
    }));
    ctx.body = { files: list };
  } catch (err) {
    ctx.status = 500;
    ctx.body = { error: '获取文件列表失败', details: err.message };
  }
});

// 挂载路由
app.use(router.routes()).use(router.allowedMethods());

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 服务器已启动，访问： http://localhost:${PORT}`);
});
