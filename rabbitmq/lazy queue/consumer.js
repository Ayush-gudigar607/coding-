import amqp from "amqplib";

async function receiveNotification() {
  try {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();

    const queueName = "lazy_queue";

    await channel.assertQueue(queueName, {
      durable: true,
    });

    console.log("Waiting for messages in lazy_queue...");

    channel.consume(
      queueName,
      (msg) => {
        if (msg !== null) {
          try {
            const message = JSON.parse(msg.content.toString());
            console.log("Received message:", message);
            channel.ack(msg);
          } catch (err) {
            console.error("Invalid message format:", err.message);
            channel.nack(msg, false, false); // discard bad message
          }
        }
      },
      { noAck: false }
    );
  } catch (error) {
    console.error("Error occurred in consumer:", error.message);
  }
}

receiveNotification();
