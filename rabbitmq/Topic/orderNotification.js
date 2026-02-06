import amqp from 'amqplib';

async function receiveMessages() {
    try {
        const connection = await amqp.connect('amqp://localhost:5672');
        const channel=await connection.createChannel();
       
        //Exchange will be same and queue will be different
        const exchange="notification_exchange";
        const queue="order_notification_queue";

        await channel.assertExchange(exchange,'topic',{durable:true});
        await channel.assertQueue(queue,{durable:true});

        await channel.bindQueue(queue,exchange,'order.*');

       
        console.log("waiting for messages");
         await channel.consume(queue,(msg)=>
        {
            if(msg!==null){
                const message = JSON.parse(msg.content.toString());
                console.log(`[Order Notification] Msg was consumed! with routing key as ${msg.fields.routingKey} and content:`, message);
                channel.ack(msg);
        }},{
            noAck:false
        })

    } catch (error) {
        console.error("Error in Order Notification Consumer:", error);
    }
    
}

receiveMessages();
