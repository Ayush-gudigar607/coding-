import amqp from "amqplib";

async function sendMail() {
  try {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();

    await channel.assertQueue("subcribed_queue", { durable: false });

    await channel.consume("subcribed_queue", (message) => {
      if (message !== null) {
        console.log("Subscription User Details:", JSON.parse(message.content.toString()));
        channel.ack(message);
      }
    });
  } catch (error) {
    throw new Error("Subscription Error Occurred");
  }
}
sendMail();
