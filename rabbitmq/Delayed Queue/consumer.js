import amqp from "amqplib";

async function processOderUpdates() {
  try {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();

    const queue = "delayed_order_updates_queue";
    await channel.assertQueue(queue, { durable: true });

    channel.consume(queue, async (msg) => {
      
      if (msg !== null) {
        const { batchId, orders } = JSON.parse(msg.content.toString());
        console.log("[Delayed Queue] Order Update Received: ", {
          batchId,
          orders,
        });

        //update order status for batch
        await updateOrderStatus(batchId);
        channel.ack(msg);
      }
    },{
        noAck:false
    });
  } catch (error) {
    console.error("Error in consumer:", error);
  }
}

function updateOrderStatus(batchId) {
    {
        return new Promise((resolve)=>
        {
           setTimeout(()=>
        {
            console.log(`Order status updated to "Started Shipping" for batch:${batchId} ` )
            resolve();
        }, 1000);
        })
    }
}

processOderUpdates();
