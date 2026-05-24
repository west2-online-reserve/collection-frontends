# 文件上传服务使用说明

## 项目简介

这是一个基于 Koa 的简单文件管理服务，支持：

- 文件上传
- 文件删除
- 文件列表查看
- 静态文件访问

服务默认运行在：

```txt
http://localhost:3000
```

---

# 目录结构

```txt
project/
│
├── server.js
├── uploads/        # 上传文件存储目录（自动创建）
├── public/         # 静态资源目录
└── package.json
```

---

# 环境要求

- Node.js >= 14
- npm 或 yarn

---

# 安装依赖

在项目根目录执行：

```bash
npm install koa koa-router koa-static koa-body fs-extra
```

或者：

```bash
yarn add koa koa-router koa-static koa-body fs-extra
```

---

# 启动项目

执行：

```bash
node server.js
```

启动成功后会看到：

```txt
Server running on http://localhost:3000
```

如果 `uploads` 目录不存在，会自动创建。

