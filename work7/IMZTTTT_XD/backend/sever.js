import express from "express";
import http from "http";
import { PrismaClient } from "@prisma/client";
import { Server as socketIO } from "socket.io";
import cors from "cors";
import bodyParser from "body-parser";
import socketHandler from "./utils/socketHandler.js";
import jwt from "jsonwebtoken";
import { secret } from "./config/config.js";

const app = express();
const server = http.createServer(app);
const io = new socketIO(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});
socketHandler(io);
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const prisma = new PrismaClient();

function generateToken(user) {
  return jwt.sign({ id: user.id, username: user.username }, secret, {
    expiresIn: "1h",
  });
}
// 登录接口
app.post("/login", async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: "账号或密码错误，请重新输入" });
    }
    const token = generateToken(user);
    res.json({ code: 200, data: { user, token } });
  } catch (error) {
    res.status(500).json({ error: "网络故障" });
  }
});
// 用户信息接口
app.get("/user", async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res
      .status(401)
      .json({ code: 401, data: { error: "没有提供Token" } });
  }
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, secret);
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        username: true,
      },
    });
    if (!user) {
      return res
        .status(404)
        .json({ code: 404, data: { error: "获取不到用户" } });
    }

    res.json({ code: 200, data: user });
  } catch (error) {
    res.status(401).json({ code: 401, data: { error: "Token无效" } });
  }
});
// 注册接口
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    // 检查用户名是否已存在
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      return res.status(400).json({ code: 400, error: "用户已存在" });
    }

    // 创建新用户
    const user = await prisma.user.create({
      data: {
        username,
        password,
      },
    });
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: "网络错误" });
  }
});
// 获取全部用户接口
app.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
      },
    });
    res.json({ users });
  } catch (error) {
    res.status(500).json({ error: "发生错误" });
  }
});
// 获取历史消息接口
app.get("/getMessage", async (req, res) => {
  const senderId = parseInt(req.query.senderId);
  const receiverId = parseInt(req.query.receiverId);

  if (isNaN(senderId) || isNaN(receiverId)) {
    return res.status(400).json({ error: "发生错误" });
  }

  try {
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { AND: [{ senderId }, { receiverId }] },
          { AND: [{ senderId: receiverId }, { receiverId: senderId }] },
        ],
      },
      orderBy: {
        timestamp: "asc",
      },
    });
    res.json({ messages });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "发送短信错误" });
  }
});

const main = async () => {
  try {
    await prisma.$connect();
    server.listen(3000, () => {
      console.log("server is running at http://localhost:3000");
    });
  } catch (err) {
    console.error("Failed to connect to the database:", err);
    process.exit(1);
  }
};

main();

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await prisma.$disconnect();
  process.exit(0);
});
