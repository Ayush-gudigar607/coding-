import amqp from "amqplib";

async function receiveMail() {
  try {
    const connecttion = await amqp.connect("amqp://localhost:5672");
    const channel = await connecttion.createChannel();

    await channel.assertQueue("user_queue", { durable: false });

    await channel.consume("user_queue", (message) => {
      if (message !== null) {
        console.log(
          " Received message for Normal Users:",
          JSON.parse(message.content)
        );
        channel.ack(message);
      }
    });
  } catch (error) {
    throw new error(" Normal User Consumer error");
  }
}
receiveMail();
