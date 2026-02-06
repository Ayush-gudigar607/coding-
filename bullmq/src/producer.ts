import { Queue } from "bullmq";

const notificationQueue = new Queue("email-queue",{
    connection: {
        host: "127.0.0.1",
        port: 6379,
    },
});

async function init() {
   const res=await notificationQueue.add("send-email", {
    email: "ayushgudigar979@gmail.com",
    subject: "welcome to bullmq ",
    body: "hello world!",
  });
 
  console.log("Job added to queue ",res.id);
}

init();
