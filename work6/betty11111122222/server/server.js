const Koa = require('koa')
const Router = require('koa-router')
const koaBody = require('koa-body').default
const serve = require('koa-static')
const fs = require('fs')
const path = require('path')
const { promisify } = require('util')

// 异步文件操作方法
const rename = promisify(fs.rename)
const readdir = promisify(fs.readdir)
const stat = promisify(fs.stat)
const unlink = promisify(fs.unlink)
const mkdir = promisify(fs.mkdir)

const app = new Koa()
const router = new Router()

// 配置
const UPLOAD_DIR = path.join(__dirname, 'uploads')
const PUBLIC_DIR = path.join(__dirname, 'public')
const MAX_FILE_SIZE = 200 * 1024 * 1024 // 200MB

// 确保上传目录存在
async function ensureUploadDir() {
  try {
    await mkdir(UPLOAD_DIR, { recursive: true })
  } catch (err) {
    console.error('无法创建上传目录:', err)
    process.exit(1)
  }
}

// 中间件
app.use(serve(PUBLIC_DIR)) // 静态文件服务
app.use(koaBody({
  multipart: true,
  formidable: {
    uploadDir: UPLOAD_DIR,
    keepExtensions: true,
    maxFileSize: MAX_FILE_SIZE,
    onFileBegin: (name, file) => {
      console.log(`开始上传: ${file.originalFilename}`)
    }
  }
}));

// 错误处理
app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.status = err.status || 500
    ctx.body = { error: err.message }
    console.error('请求处理错误:', err)
  }
});

// API路由
router.post('/api/upload', async (ctx) => {
  const file = ctx.request.files?.file
  if (!file) {
    ctx.throw(400, '请选择要上传的文件')
  }

  const filename = path.basename(file.newFilename)
  const originalName = path.basename(file.originalFilename)
  const filePath = path.join(UPLOAD_DIR, filename)

  try {
    await rename(file.filepath, filePath)
    ctx.body = {
      success: true,
      filename,
      originalName,
      size: file.size,
      type: file.mimetype,
      url: `${ctx.protocol}://${ctx.host}/api/download/${filename}`
    };
  } catch (err) {
    ctx.throw(500, '文件保存失败')
  }
});

router.delete('/api/delete', async (ctx) => {
  const { filename } = ctx.query
  if (!filename) {
    ctx.throw(400, '需要提供文件名')
  }

  const safeFilename = path.basename(filename)
  const filePath = path.join(UPLOAD_DIR, safeFilename)

  try {
    await unlink(filePath)
    ctx.body = { success: true, message: '文件已删除' }
  } catch (err) {
    if (err.code === 'ENOENT') {
      ctx.throw(404, '文件不存在')
    } else {
      ctx.throw(500, '删除文件失败')
    }
  }
});

router.get('/api/files', async (ctx) => {
  try {
    const files = await readdir(UPLOAD_DIR)
    const fileList = await Promise.all(
      files.map(async file => {
        const filePath = path.join(UPLOAD_DIR, file)
        const stats = await stat(filePath)
        return {
          name: file,
          size: stats.size,
          mtime: stats.mtime,
          url: `${ctx.protocol}://${ctx.host}/api/download/${file}`
        };
      })
    );
    ctx.body = { files: fileList.filter(f => f) }
  } catch (err) {
    ctx.throw(500, '获取文件列表失败')
  }
});

router.get('/api/download/:filename', async (ctx) => {
  const filename = path.basename(ctx.params.filename)
  const filePath = path.join(UPLOAD_DIR, filename)

  try {
    const stats = await stat(filePath)
    ctx.set('Content-Length', stats.size)
    ctx.set('Content-Disposition', `attachment; filename="${filename}"`)
    ctx.body = fs.createReadStream(filePath)
  } catch (err) {
    if (err.code === 'ENOENT') {
      ctx.throw(404, '文件不存在')
    } else {
      ctx.throw(500, '下载文件失败')
    }
  }
});

// 初始化并启动服务器
async function startServer() {
  await ensureUploadDir()
  
  app.use(router.routes()).use(router.allowedMethods())
  
  const PORT = process.env.PORT || 3000
  app.listen(PORT, () => {
    console.log(`服务器运行在 http://localhost:${PORT}`)
    console.log(`文件上传目录: ${UPLOAD_DIR}`)
    console.log(`静态文件目录: ${PUBLIC_DIR}`)
  });
}

startServer().catch(err => {
  console.error('服务器启动失败:', err)
  process.exit(1)
});
