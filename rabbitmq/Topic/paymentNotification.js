import amqp from 'amqplib';

async function receiveNotification() {
    try {
        const connection=await amqp.connect("amqp://localhost:5672");
        const channel=await connection.createChannel();

        const exchange="notification_exchange";
        const queue="payment_notification_queue";

        await channel.assertExchange(exchange,'topic',{durable:true});
        await channel.assertQueue(queue,{durable:true});

        await channel.bindQueue(queue,exchange,'payment.*');
        console.log("waiting for payment notifications");

         await channel.consume(queue,(msg)=>
        {
            if(msg!==null)
            {
                const message = JSON.parse(msg.content.toString());
                console.log(`[Payment Notification] Msg was consumed! with routing key as ${msg.fields.routingKey} and content: `, message);
                channel.ack(msg);
            }
        },{
            noAck:false
        })
    } catch (error) {
        console.error("Error in Payment Notification Consumer:", error);
    }
}

receiveNotification();