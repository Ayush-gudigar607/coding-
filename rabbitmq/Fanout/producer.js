import amqp from "amqplib";

async function announceMessages(product) {
  try {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();

    const exchange = "new_product_launch";
    const exchangeType = "fanout";


    await channel.assertExchange(exchange, exchangeType, { durable: true });
    const message = JSON.stringify(product);

    channel.publish(exchange, "", Buffer.from(message),{persistent:true});
    console.log(" [x] Sent %s", message);

    setTimeout(() => {
      connection.close();
    }, 5000);
  } catch (error) {}
}

announceMessages({ id: 1, name: "Laptop", price: 45000 });
