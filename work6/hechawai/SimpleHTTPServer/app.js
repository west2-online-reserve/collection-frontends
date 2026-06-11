const Koa = require('koa');
const Router = require('@koa/router');
const serve = require('koa-static');
const { koaBody } = require('koa-body');
const session = require('koa-session');
const path = require('path');
const fs = require('fs').promises;

const app = new Koa();
const router = new Router();

// Session 配置（用于记住登录状态）
app.keys = ['my-secret-key-for-session'];
const sessionConfig = {
    key: 'koa:sess',
    maxAge: 86400000, // 24小时
    httpOnly: true,
    signed: true
};
app.use(session(sessionConfig, app));

const UPLOAD_DIR = path.join(__dirname, 'uploads');
const PUBLIC_DIR = __dirname;
const USERS_FILE = path.join(__dirname, 'users.json');

// 确保目录存在
async function ensureDirs() {
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
    // 初始化用户文件
    try {
        await fs.access(USERS_FILE);
    } catch {
        await fs.writeFile(USERS_FILE, JSON.stringify([]));
    }
}
ensureDirs();

// 读取用户数据库
async function readUsers() {
    try {
        const data = await fs.readFile(USERS_FILE, 'utf8');
        return JSON.parse(data);
    } catch {
        return [];
    }
}

// 写入用户数据库
async function writeUsers(users) {
    await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
}

// 注册用户
async function registerUser(username, password) {
    const users = await readUsers();
    
    // 检查用户名是否已存在
    if (users.find(u => u.username === username)) {
        return { success: false, message: '用户名已存在' };
    }
    
    users.push({ username, password });
    await writeUsers(users);
    return { success: true, message: '注册成功' };
}

// 验证登录
async function loginUser(username, password) {
    const users = await readUsers();
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        return { success: true, message: '登录成功' };
    }
    return { success: false, message: '用户名或密码错误' };
}

// 读取文件数据库
async function readFileDB() {
    const dbPath = path.join(__dirname, 'files.json');
    try {
        const data = await fs.readFile(dbPath, 'utf8');
        return JSON.parse(data);
    } catch {
        return [];
    }
}

async function writeFileDB(data) {
    const dbPath = path.join(__dirname, 'files.json');
    await fs.writeFile(dbPath, JSON.stringify(data, null, 2));
}

async function saveFileInfo(fileInfo) {
    const db = await readFileDB();
    db.push(fileInfo);
    await writeFileDB(db);
}

async function deleteFileInfo(filename) {
    const db = await readFileDB();
    const newDb = db.filter(f => f.filename !== filename);
    await writeFileDB(newDb);
}

async function getFileList() {
    const db = await readFileDB();
    return db.sort((a, b) => new Date(b.uploadTime) - new Date(a.uploadTime));
}

// 检查是否登录的中间件
async function checkAuth(ctx, next) {
    if (!ctx.session.user) {
        ctx.status = 401;
        ctx.body = { success: false, error: '请先登录' };
        return;
    }
    await next();
}

// 配置文件上传
app.use(koaBody({
    multipart: true,
    formidable: {
        uploadDir: UPLOAD_DIR,
        keepExtensions: true,
        maxFileSize: 10 * 1024 * 1024,
        onFileBegin: (name, file) => {
            const ext = path.extname(file.originalFilename);
            const timestamp = Date.now();
            const randomStr = Math.random().toString(36).substring(2, 8);
            const newFilename = `${timestamp}-${randomStr}${ext}`;
            file.newFilename = newFilename;
            file.filepath = path.join(UPLOAD_DIR, newFilename);
        }
    }
}));

// 静态文件服务
app.use(serve(PUBLIC_DIR));
app.use(serve(UPLOAD_DIR, { prefix: '/uploads' }));

//用户相关 API

// 注册接口
router.post('/api/register', async (ctx) => {
    const { username, password } = ctx.request.body;
    
    if (!username || !password) {
        ctx.body = { success: false, error: '请输入用户名和密码' };
        return;
    }
    
    const result = await registerUser(username, password);
    ctx.body = result;
});

// 登录接口
router.post('/api/login', async (ctx) => {
    const { username, password } = ctx.request.body;
    
    if (!username || !password) {
        ctx.body = { success: false, error: '请输入用户名和密码' };
        return;
    }
    
    const result = await loginUser(username, password);
    
    if (result.success) {
        ctx.session.user = username;
        ctx.body = { success: true, message: '登录成功', username };
    } else {
        ctx.body = result;
    }
});

// 登出接口
router.post('/api/logout', async (ctx) => {
    ctx.session = null;
    ctx.body = { success: true, message: '已登出' };
});

// 检查登录状态
router.get('/api/check', async (ctx) => {
    if (ctx.session.user) {
        ctx.body = { isLogin: true, username: ctx.session.user };
    } else {
        ctx.body = { isLogin: false };
    }
});

//文件相关 API（需要登录）

// 获取文件列表
router.get('/api/files', checkAuth, async (ctx) => {
    const files = await getFileList();
    ctx.body = { success: true, files };
});

// 上传文件
router.post('/api/upload', checkAuth, async (ctx) => {
    const file = ctx.request.files?.file;
    
    if (!file) {
        ctx.body = { success: false, error: '请选择文件' };
        return;
    }
    
    const fileInfo = {
        filename: file.newFilename,
        originalName: file.originalFilename,
        url: `/uploads/${file.newFilename}`,
        uploadTime: new Date().toISOString(),
        uploader: ctx.session.user
    };
    
    await saveFileInfo(fileInfo);
    
    ctx.body = {
        success: true,
        message: '上传成功',
        file: fileInfo
    };
});

// 删除文件
router.delete('/api/delete', checkAuth, async (ctx) => {
    const filename = ctx.query.filename;
    
    if (!filename) {
        ctx.body = { success: false, error: '请提供文件名' };
        return;
    }
    
    const filePath = path.join(UPLOAD_DIR, filename);
    
    try {
        await fs.unlink(filePath);
        await deleteFileInfo(filename);
        ctx.body = { success: true, message: '删除成功' };
    } catch {
        ctx.body = { success: false, error: '文件不存在' };
    }
});

app.use(router.routes());
app.use(router.allowedMethods());

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`\n服务器已启动`);
    console.log(`访问地址: http://localhost:${PORT}`);
    console.log(`\n请先注册账号，再登录使用\n`);
});
