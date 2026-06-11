# SimpleHTTPServer - 摆渡网盘

## 项目简介

这是一个基于 Koa 框架的文件管理服务，支持：

- 用户注册/登录
- 文件上传（支持拖拽上传）
- 文件删除
- 文件列表查看
- 文件下载访问
- 中文文件名支持

服务默认运行在：

```
http://localhost:3000
```

## 目录结构

SimpleHTTPServer/
│
├── app.js # 服务器核心代码
├── index.html # 前端界面
├── uploads/ # 上传文件存储目录（自动创建）
├── files.json # 文件信息数据库（自动创建）
├── users.json # 用户信息数据库（自动创建）
└── README.md # 说明文档

## 环境要求

- Node.js >= 14
- npm 或 yarn（用于安装依赖）

## 安装依赖

在项目根目录执行以下命令安装所需依赖：

```
npm install koa @koa/router koa-body koa-static koa-session
```

## 启动项目

在项目根目录执行以下命令启动服务：

```
node app.js
```

启动成功后，控制台会输出提示信息：

```
服务器已启动
访问地址: http://localhost:3000

请先注册账号，再登录使用
```

服务无需登录即可直接使用，若项目中不存在 uploads 目录，程序会自动创建。

## API 接口说明

| 接口地址                 | 请求方法 | 功能说明         | 是否需要登录 |
| ------------------------ | -------- | ---------------- | ------------ |
| /api/register            | POST     | 用户注册         | 否           |
| /api/login               | POST     | 用户登录         | 否           |
| /api/logout              | POST     | 用户登出         | 是           |
| /api/check               | GET      | 检查登录状态     | 否           |
| /api/files               | GET      | 获取所有文件列表 | 是           |
| /api/upload              | POST     | 上传文件         | 是           |
| /api/delete?filename=xxx | DELETE   | 删除指定文件     | 是           |
| /uploads/:filename       | GET      | 下载/查看文件    | 否           |

## 功能特点

- 自动处理文件名冲突：上传文件时自动生成「时间戳 - 随机字符串.扩展名」格式的唯一文件名
- 交互便捷：支持文件拖拽上传
- 用户系统：支持注册、登录、登出，只有登录用户才能上传和删除文件
- 数据持久化：文件信息存储在 files.json，用户信息存储在 users.json

## 注意事项

- 服务默认端口为 3000，如需更换端口，直接修改 app.js 内的 PORT 变量即可
- 建议单文件上传大小不超过 10MB
- 程序首次运行时，会自动生成 uploads 目录与 files.json 文件
