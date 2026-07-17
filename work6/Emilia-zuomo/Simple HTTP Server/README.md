# Koa 轻量级文件管理服务

## 环境要求

- Node.js >= 16
- npm 或 yarn

---

## 安装依赖

在项目根目录执行：

```bash
npm install koa @koa/router koa-bodyparser koa-static @koa/multer better-sqlite3 jsonwebtoken bcryptjs uuid
```

---

## 启动项目

执行：

```bash
node server.js
```

服务启动后，浏览器访问 http://localhost:3000 即可使用前端页面。

---

## CMD 启动方式
为了方便使用，本项目提供了 `start-server.cmd` 启动脚本。

相比直接使用 `node server.js`，CMD 启动方式更加适合：

-   不熟悉命令行的用户
-   Windows 环境快速启动
-   自动检测并创建 `uploads` 目录

---

## 使用方法

1. 双击运行 start-server.cmd
2. 等待控制台输出 "🚀 Server running at http://localhost:3000"
3. 打开浏览器访问 http://localhost:3000
4. 使用默认账号 admin / admin123 登录
5. 登录后即可进行文件上传、查看列表和删除操作

---

## 默认账号与鉴权说明

该服务内置了 JWT 鉴权机制，上传和删除接口受保护。

| 用户名 | 密码     | 备注             |
| :----- | :------- | :--------------- |
| admin  | admin123 | 首次启动自动创建 |

> ⚠️ **安全提示**：生产环境请务必修改默认密码或在 `db.js` 中禁用自动创建管理员逻辑。

---

## API 接口说明

文件列表接口 `/api/files` 返回的数据格式如下：

    [
        {
            "id": 1,
            "original_name": "测试报告.pdf",
            "stored_name": "a1b2c3d4-e5f6-7890-abcd-ef1234567890.pdf",
            "size": 102400,
            "created_at": "2026-07-17 10:30:00",
            "url": "/uploads/a1b2c3d4-e5f6-7890-abcd-ef1234567890.pdf"
        }
    ]

注意：

-   `original_name` 为用户上传时的原始文件名（已修复中文乱码）
-   `stored_name` 为服务器物理存储的 UUID 文件名，用于避免冲突
-   `url` 为可直接访问的文件下载链接
-   上传接口 `/api/upload` 需携带 `Authorization: Bearer <token>` 请求头
-   删除接口 `/api/delete` 需携带 Token，Body 传参 `{ "filename": "stored_name值" }`