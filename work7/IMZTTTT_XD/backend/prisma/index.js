import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // ... you will write your Prisma Client queries here
  const allUsers = await prisma.user.findMany();
  console.log(allUsers);
}
async function createMessage() {
  const message = await prisma.message.create({
    data: {
      content: "乌拉",
      timestamp: new Date(),
      sender: {
        connect: {
          id: 2,
        },
      },
      receiver: {
        connect: {
          id: 1,
        },
      },
    },
    select: {
      id: true,
      content: true,
      senderId: true,
      receiverId: true,
      timestamp: true,
      sender: {
        select: {
          id: true,
          username: true,
        },
      },
      receiver: {
        select: {
          id: true,
          username: true,
        },
      },
    },
  });

  console.log(message);
}

createMessage().catch((e) => console.error(e));
main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
