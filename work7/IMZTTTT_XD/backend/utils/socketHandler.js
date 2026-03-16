import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const userList = [];

const socketHandler = (io) => {
  // 连接
  io.on("connection", (socket) => {
    const username = socket.handshake.query.username;
    const id = socket.handshake.query.id;
    if (!username) return;

    console.log(username + " connected!");
    const userInfo = userList.find((user) => user.username === username);

    if (userInfo) {
      userInfo.socketId = socket.id;
    } else {
      userList.push({
        username,
        id,
        socketId: socket.id,
      });
    }
    // 把在线用户传给客户端
    socket.emit("online", {
      userList,
    });
    // 发送短信
    socket.on("send", async (msg) => {
      console.log("Received message:", msg); 
      try {
        const message = await prisma.message.create({
          data: {
            content: msg.content,
            senderId: msg.senderId,
            receiverId: msg.receiverId,
            timestamp: msg.timestamp,
          },
        });
        socket.broadcast.emit("message", message);
        // 给接收者发送消息
        const receiverInfo = userList.find(
          (user) => user.id === String(msg.receiverId)
        );
        console.log("receiverInfo:", receiverInfo);
        if (receiverInfo) {
          io.to(receiverInfo.socketId).emit("receive", message);
        }
      } catch (error) {
        console.error("Error saving message:", error);
      }
    });
  });
};

export default socketHandler;
