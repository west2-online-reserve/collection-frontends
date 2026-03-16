// queue.js (CommonJS模块)
let PQueue;
let queueInstance;

async function getQueue() {
  if (!PQueue) {
    PQueue = (await import('p-queue')).default;
    queueInstance = new PQueue({ concurrency: 5 });
  }
  return queueInstance;
}

module.exports = { getQueue };