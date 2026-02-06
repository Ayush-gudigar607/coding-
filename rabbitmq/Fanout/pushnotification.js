import amqp from 'amqplib';

async function pushNotification() {
    try {
        const connection = await amqp.connect("amqp://localhost:5672");
        const channel = await connection.createChannel();

        const exchange = "new_product_launch";
        const exchangeType = "fanout";

        await channel.assertExchange(exchange,exchangeType,{durable:true});

        const queue=await channel.assertQueue("",{exclusive:true});

        await channel.bindQueue(queue.queue,exchange,"");

        console.log("Waiting for new product launch notifications");

        await channel.consume(queue.queue,(msg)=>
        {
            if(msg!=null)
            {
                const product=JSON.parse(msg.content.toString());
                console.log("[Push Notification] New Product Launched: ",product);
                channel.ack(msg);
            }
        },{
            noAck:false
        })
    } catch (error) {
        console.error("Error in Push Notification Consumer:", error);
    }
}
pushNotification();