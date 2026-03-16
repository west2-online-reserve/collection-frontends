const Koa = require('koa');
const Router = require('@koa/router');
const static = require('koa-static');
const path = require('path');
const fs = require('fs').promises;
const { koaBody } = require('koa-body');
const { Sequelize, DataTypes } = require('sequelize');
const jwt = require('jsonwebtoken');

const app = new Koa();
const router = new Router();
const secretKey = 'your-secret-key'; // 用于JWT签名

// 确保上传目录存在
const UPLOAD_DIR = path.join(__dirname, 'uploads');
fs.mkdir(UPLOAD_DIR, { recursive: true }).catch(console.error);

// 中间件：处理文件上传和请求体
app.use(koaBody({
  multipart: true,
  formidable: {
    uploadDir: UPLOAD_DIR,
    keepExtensions: true,
  },
  json:true,
  urlencoded: true,
}));


// 静态文件服务
app.use(static(UPLOAD_DIR));  // 提供上传文件访问
app.use(static(path.join(__dirname, 'public')));  // 提供前端界面


// 应用路由
app.use(router.routes());
app.use(router.allowedMethods());



// 检查文件是否存在，若存在则添加数字后缀
async function getUniqueFilename(dir, originalFilename) {
  const { name, ext } = path.parse(originalFilename);
  let newFilename = originalFilename;
  let counter = 1;

  // 循环检查文件是否已存在
  while (await fileExists(path.join(dir, newFilename))) {
    newFilename = `${name}(${counter})${ext}`;
    counter++;
  }

  return newFilename;
}

// 检查文件是否存在的辅助函数
async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

// 数据库配置
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite',
  logging: false // 生产环境建议关闭SQL日志
});

// 定义用户模型
const User = sequelize.define('users', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  password: {
    type: DataTypes.STRING
  }
});

// 定义文件模型
const File = sequelize.define('files', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  originalFilename: {
    type: DataTypes.STRING
  },
  savedFilename: {
    type: DataTypes.STRING
  },
  uploadedBy: {
    type: DataTypes.STRING
  },
  uploadedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

// 同步数据库模型
async function initDatabase() {
  try {
    await sequelize.authenticate();
    console.log('数据库连接成功');
    
    // 正常同步（只创建不存在的表）
    await sequelize.sync({alter: true});
    
    console.log('数据库已建立/已更新');
  } catch (error) {
    console.error('数据库初始化失败:', error);
    process.exit(1);
  }
}

// 创建示例用户
async function createSampleUser() {
  try {
    const [user, created] = await User.findOrCreate({
      where: { id: 'admin' },
      defaults: { password: 'admin123' }
    });
    
    if (created) {
      console.log('示例用户已创建:', user.id);
    } else {
      console.log('示例用户已存在:', user.id);
    }
  } catch (error) {
    console.error('创建示例用户失败:', error);
  }
}

// 中间件：验证JWT
const authenticate = async (ctx, next) => {
  const authHeader = ctx.headers.authorization;
  
  if (!authHeader) {
    ctx.status = 401;
    ctx.body = { error: '认证失败：缺少令牌' };
    return;
  }

  const token = authHeader.replace('Bearer ', '');
  
  try {
    const decoded = jwt.verify(token, secretKey);
    ctx.state.user = decoded;
    await next();
  } catch (err) {
    ctx.status = 401;
    ctx.body = { error: '认证失败：无效令牌' };
  }
};

// 登录接口
router.post('/api/login', async (ctx) => {
    console.log('body:\n');
    console.log(ctx.request.body);
    console.log('request:\n');
    console.log(ctx.request);

  const { userId, password } = ctx.request.body;

  
  const user = await User.findOne({ where: { id: userId, password: password } });
  
  if (!user) {
    ctx.status = 401;
    ctx.body = { error: '认证失败：用户名或密码错误' };
    return;
  }

  const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '1h' });
  
  ctx.body = { token };
});

// 路由：文件上传
router.post('/api/upload', authenticate, async (ctx) => {
  const file = ctx.request.files?.file;
  if (!file) {
    ctx.status = 400;
    ctx.body = { error: '未上传文件' };
    return;
  }

  const originalFilename = file.originalFilename;
  const tempPath = file.filepath;
  const uploadDir = path.join(__dirname, 'uploads');

  // 获取唯一文件名
  const uniqueFilename = await getUniqueFilename(uploadDir, originalFilename);
  const targetPath = path.join(uploadDir, uniqueFilename);

  // 重命名文件（从临时路径移动到上传目录）
  await fs.rename(tempPath, targetPath);

  // 保存文件信息到数据库
  await File.create({
    originalFilename,
    savedFilename: uniqueFilename,
    uploadedBy: ctx.state.user.id
  });

  ctx.body = {
    message: '上传成功',
    savedName: uniqueFilename,
    fileurl: uniqueFilename,
  };
});

// 路由：删除文件
router.delete('/api/delete/:filename', authenticate, async (ctx) => {
  const filename = ctx.params.filename;
  const filePath = path.join(UPLOAD_DIR, filename);

  try {
    await fs.access(filePath);
    await fs.unlink(filePath);

    // 从数据库中删除文件信息
    await File.destroy({ where: { savedFilename: filename } });

    ctx.body = { message: `File ${filename} deleted successfully` };
  } catch (err) {
    ctx.status = 404;
    ctx.body = { error: 'File not found' };
  }
});

// 路由：获取文件列表
router.get('/api/files', authenticate, async (ctx) => {
  try {
    const files = await File.findAll();
    const baseUrl = 'http://localhost:3000';
    const fileList = files.map(file => ({
      name: file.savedFilename,
      url: `${baseUrl}/${file.savedFilename}`,
      originalName: file.originalFilename,
      uploadedBy: file.uploadedBy,
      uploadedAt: file.uploadedAt
    }));
    ctx.body = fileList;
  } catch (err) {
    ctx.status = 500;
    ctx.body = { error: 'Unable to read directory' };
  }
});

// 启动服务器
const PORT = process.env.PORT || 3000;

// 初始化数据库并启动服务器
initDatabase().then(() => {
  createSampleUser();
  app.listen(PORT, () => {
    console.log(`服务器运行在 http://localhost:${PORT}`);
  });
});