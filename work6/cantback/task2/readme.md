1. 鉴权功能采用 JWT（JSON Web Token）方式；

2. 用户表结构：（需要手动创建）

```SQL
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE COMMENT '用户名，唯一',
  password_hash VARCHAR(255) NOT NULL COMMENT 'bcrypt 哈希后的密码',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '注册时间',
  role VARCHAR(50) NOT NULL DEFAULT 'user' COMMENT '用户角色'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

3. 文件表结构：
```SQL
CREATE TABLE IF NOT EXISTS uploads (
  id INT AUTO_INCREMENT PRIMARY KEY,
  filename VARCHAR(255) NOT NULL COMMENT '服务器保存的唯一文件名',
  original_filename VARCHAR(255) NOT NULL COMMENT '用户上传时的原始文件名',
  username VARCHAR(100) NOT NULL COMMENT '上传者用户名',
  upload_time DATETIME NOT NULL COMMENT '上传时间',
  size BIGINT NOT NULL COMMENT '文件大小，字节数'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='上传文件记录表'
```

4. 接口说明：
上传接口 /api/upload：
* 使用 koa-body 接收文件（multipart/form-data）。
* 生成唯一文件名（原名 + 时间戳 + 随机串），移动到 ./uploads 目录。
* 插入一条记录到 MySQL 的 uploads 表。
* 返回前端可访问的相对 URL。

删除接口 /api/delete：
* 接收 DELETE 请求里的 JSON { filename }，删除服务器磁盘文件。

列出文件接口 /api/files：
* 读取 ./uploads 目录下的所有文件名，返回给前端。

5. 重复文件处理办法
   为上传文件生成唯一文件名（原名 + 时间戳 + 随机串 + 扩展名）