// server.js
import Koa from "koa";
import Router from "@koa/router";
import bodyParser from "koa-bodyparser";
import { Op } from "sequelize";
import { sequelize, Notice } from "./models/notice.js";

const app = new Koa();
const router = new Router();
const PORT = process.env.PORT || 3000;

// 中间件：解析请求体（本示例主要 GET，不必要但保留便于扩展）
app.use(bodyParser());

// 根路由：简单提示
router.get("/", async (ctx) => {
  ctx.body = "请访问 /notices";
});

// GET /notices?limit=20&page=1
router.get("/notices", async (ctx) => {
  try {
    const limit = parseInt(ctx.query.limit, 10) || 20;
    const page = parseInt(ctx.query.page, 10) || 1;
    const minViews = parseInt(ctx.query.minViews, 10) || 0;

    const offset = (page - 1) * limit;
    const whereClause = {};
    if (minViews > 0) {
      whereClause.viewCount = { [Op.gte]: minViews };
    }

    const { rows, count } = await Notice.findAndCountAll({
      where: whereClause,
      order: [["scrapedAt", "DESC"]],
      limit,
      offset, 
    });

    ctx.body = {
      total: count,
      page,
      limit,
      data: rows
    };
  } catch (err) {
    console.error(err);
    ctx.status = 500;
    ctx.body = { error: "服务器内部错误" };
  }
});

// GET /notices/:id
router.get("/notices/:id", async (ctx) => {
  try {
    const id = ctx.params.id;
    const notice = await Notice.findByPk(id);
    if (!notice) {
      ctx.status = 404;
      ctx.body = { error: "未找到对应通知" };
      return;
    }
    ctx.body = notice;
  } catch (err) {
    console.error(err);
    ctx.status = 500;
    ctx.body = { error: "服务器内部错误" };
  }
});

// 挂载路由
app.use(router.routes()).use(router.allowedMethods());

// 启动服务器
app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ 数据库连接成功");
  } catch (dbErr) {
    console.error("❌ 数据库连接失败：", dbErr);
  }
  console.log(`🚀 Koa 服务器已启动，监听端口 ${PORT}`);
});
