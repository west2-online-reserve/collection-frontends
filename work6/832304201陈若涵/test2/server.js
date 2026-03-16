const Koa = require("koa");
const Router = require("koa-router");
const static = require("koa-static");
const cors = require("@koa/cors");
const multer = require("@koa/multer");
const fs = require("fs");
const path = require("path");

const app = new Koa();
const router = new Router();

// 确保上传目录存在
const UPLOAD_DIR = path.join(__dirname, "uploads");
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// 配置 multer 文件上传
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

// 启用 CORS
app.use(cors());

// 静态文件服务
app.use(static(path.join(__dirname, "public")));

// 文件上传接口
router.post("/api/upload", upload.single("file"), async (ctx) => {
  try {
    if (!ctx.file) {
      ctx.status = 400;
      ctx.body = { error: "No file uploaded" };
      return;
    }

    ctx.body = {
      message: "File uploaded successfully",
      filename: ctx.file.originalname,
      url: `http://${ctx.host}/uploads/${ctx.file.originalname}`,
    };
  } catch (err) {
    ctx.status = 400;
    ctx.body = { error: err.message };
  }
});

// 文件删除接口
router.delete("/api/delete", async (ctx) => {
  try {
    const { filename } = ctx.request.query;
    if (!filename) {
      ctx.status = 400;
      ctx.body = { error: "Filename is required" };
      return;
    }

    const filePath = path.join(UPLOAD_DIR, filename);
    if (!fs.existsSync(filePath)) {
      ctx.status = 404;
      ctx.body = { error: "File not found" };
      return;
    }

    fs.unlinkSync(filePath);
    ctx.body = { message: "File deleted successfully" };
  } catch (err) {
    ctx.status = 400;
    ctx.body = { error: err.message };
  }
});

// 文件列表接口
router.get("/api/files", async (ctx) => {
  try {
    const files = fs.readdirSync(UPLOAD_DIR);
    ctx.body = {
      files: files.map((file) => ({
        name: file,
        url: `http://${ctx.host}/uploads/${file}`,
      })),
    };
  } catch (err) {
    ctx.status = 400;
    ctx.body = { error: err.message };
  }
});

// 注册路由
app.use(router.routes()).use(router.allowedMethods());

// 错误处理
app.on("error", (err, ctx) => {
  console.error("Server error:", err);
  ctx.status = 500;
  ctx.body = { error: "Internal server error" };
});

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
