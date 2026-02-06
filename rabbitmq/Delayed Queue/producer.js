import amqp from "amqplib";

async function sendToDelayedQueue(batchId, orders, delay) {
  const connection = await amqp.connect("amqp://localhost:5672");
  const channel = await connection.createChannel();

  const exchange = "delayed_exchange";
  await channel.assertExchange(exchange, "x-delayed-message", {
    durable: true,
    arguments: { "x-delayed-type": "direct" },
  });

  const queue = "delayed_order_updates_queue";
  await channel.assertQueue(queue, { durable: true });

  await channel.bindQueue(queue, exchange, "");

  const message = JSON.stringify({ batchId, orders });

  channel.publish(exchange, "", Buffer.from(message), {
    headers: { "x-delay": delay },
    persistent: true,
  });


  console.log("--------------------------------------");
  console.log(`Sent batch ${batchId} to delayed queue with ${delay} ms delay`);
  console.log("--------------------------------------");

  await channel.close();
  await connection.close();
}

async function processBatchOrders() {
  const batchId = generateBatchId();
  const orders = collectOrdersForBatch();

  console.log("--------------------------------------");
  console.log(`processing batch ${batchId} with orders:${JSON.stringify(orders)}`);
  console.log("--------------------------------------");



  await processOrders(orders);

  const delay = 10000;
  await sendToDelayedQueue(batchId, orders, delay);
}

function generateBatchId() {
  return "batch_" + Date.now();
}

function collectOrdersForBatch() {
  return [
    { orders: 1, item: "laptop", quantity: 1 },
    { orders: 2, item: "phone", quantity: 2 },
    { orders: 3, item: "headphones", quantity: 1 },
  ];
}

async function processOrders(orders) {
  return new Promise((resolve) => setTimeout(resolve, 2000));
}

processBatchOrders();
