import amqp from 'amqplib';

async function smsNotication() {
    try {
        const connection = await amqp.connect("amqp://localhost:5672");
        const channel = await connection.createChannel();

        const exchange = "new_product_launch";
        const exchangeType = "fanout";

        await channel.assertExchange(exchange, exchangeType, { durable: true });

        //this will mainly help to store the queue in temp memory if connection drops queue will be deleted (exclusive queue done the same thing here)
        const queue=await channel.assertQueue("",{exclusive:true});
        
        await channel.bindQueue(queue.queue,exchange,"");
        console.log("Waiting for new product launch notifications");

        await channel.consume(queue.queue,(msg)=>
        {
            if(msg!==null)
            {
                const product=JSON.parse(msg.content.toString());
                console.log("[SMS Notification] New Product Launched: ",product);
                channel.ack(msg);
            }
        })
    } catch (error) {
        console.error("Error in SMS Notification Consumer:", error);
    }
}

smsNotication();