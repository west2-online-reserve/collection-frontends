const Koa = require('koa');
const Router = require('@koa/router');
const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');
const { crawlNotices } = require('./crawler');

// 数据库连接配置
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, 'notices.db'),
  logging: false // 生产环境建议关闭SQL日志
});

// 定义数据模型
const Notice = sequelize.define('notice', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  publishDate: {
    type: DataTypes.STRING,
    allowNull: false
  },
  department: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  /*viewCount: {
    type: DataTypes.INTEGER,
    allowNull: true
  },*/
  url: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// 2. 初始化数据库
async function initDatabase() {
  try {
    await sequelize.authenticate();
    console.log('数据库连接成功');
    
    // 同步模型到数据库（创建表）
    await sequelize.sync({ alter: true });
    console.log('数据库表已创建/更新');
  } catch (error) {
    console.error('数据库连接失败:', error);
  }
}

// 3. 数据操作函数
/*async function saveNotices(notices) {
  try {
    // 批量插入数据（自动去重，因为link字段设置了unique）
    await Notice.bulkCreate(notices, { updateOnDuplicate: ['content', 'viewCount'] });
    console.log(`成功保存 ${notices.length} 条通知`);
  } catch (error) {
    console.error('保存数据失败:', error);
  }
}*/

// 示例问题代码
async function saveNotices(notices) {
  try {
    // 假设这里有数据处理逻辑
    const formattedNotices = notices.map(notice => ({
      title: notice.title,
      publishDate: notice.publishDate,
      department: notice.department,
      content: notice.content,
      //viewCount: parseInt(notice.viewCount), // 可能解析失败导致 NaN
      url: notice.url
    }));

    await Notice.bulkCreate(formattedNotices); // 错误发生在这里
    console.log('通知保存成功');
  } catch (error) {
     //console.error(`获取通知详情失败 : ${error.message}`);
    throw error;
  }
}

// 创建 Koa 应用和路由
const app = new Koa();
const router = new Router({ prefix: '/api' });

// 错误处理中间件
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    ctx.status = error.status || 500;
    ctx.body = { error: error.message };
    console.error('API 错误:', error);
  }
});

// 接口：获取所有通知（分页）
router.get('/notices', async (ctx) => {
  const { page = 1, limit = 20 } = ctx.query;
  const offset = (page - 1) * limit;

  const notices = await Notice.findAll({
    limit: parseInt(limit),
    offset: parseInt(offset),
    order: [['publishDate', 'DESC']]
  });

  ctx.body = notices;
});

// 接口：按日期范围查询通知
router.get('/notices/date', async (ctx) => {
  const { start, end } = ctx.query;
  
  if (!start || !end) {
    ctx.status = 400;
    ctx.body = { error: '需要提供 start 和 end 日期参数' };
    return;
  }

  const notices = await Notice.findAll({
    where: {
      publishDate: {
        [Sequelize.Op.between]: [start, end]
      }
    },
    order: [['publishDate', 'DESC']]
  });

  ctx.body = notices;
});

// 接口：按ID查询单个通知
router.get('/notices/:id', async (ctx) => {
  const notice = await Notice.findByPk(ctx.params.id);
  
  if (!notice) {
    ctx.status = 404;
    ctx.body = { error: '未找到该通知' };
    return;
  }

  ctx.body = notice;
});

// 接口：保存通知（批量）
router.post('/notices', async (ctx) => {
  const notices = ctx.request.body;
  
  if (!Array.isArray(notices) || notices.length === 0) {
    ctx.status = 400;
    ctx.body = { error: '需要提供通知数组' };
    return;
  }

  await Notice.bulkCreate(notices, { ignoreDuplicates: true });
  ctx.body = { message: '通知保存成功', count: notices.length };
});

// 接口：获取通知统计信息
router.get('/stats', async (ctx) => {
  const totalCount = await Notice.count();
  const latestDate = await Notice.max('publishDate');
  const departments = await Notice.findAll({
    attributes: ['department', [Sequelize.fn('COUNT', 'id'), 'count']],
    group: ['department'],
    order: [[Sequelize.fn('COUNT', 'id'), 'DESC']]
  });

  ctx.body = {
    totalCount,
    latestDate,
    departments
  };
});

// 应用路由
app.use(router.routes());
app.use(router.allowedMethods());

// 启动服务器
async function startServer() {
  try {
    await initDatabase();
    const notices = await crawlNotices();
    await saveNotices(notices);
    const port = process.env.PORT || 3001;
    app.listen(port, () => {
      console.log(`服务器运行在 http://localhost:${port}`);
      console.log('可用API:');
      console.log('GET /api/notices - 获取所有通知');
      console.log('GET /api/notices/date?start=2023-01-01&end=2023-12-31 - 按日期范围查询');
      console.log('GET /api/notices/:id - 按ID查询单个通知');
      console.log('POST /api/notices - 保存通知');
      console.log('GET /api/stats - 获取通知统计信息');
    });
  } catch (error) {
    console.error('服务器启动失败:', error);
    process.exit(1);
  }
}

// 启动应用
startServer();