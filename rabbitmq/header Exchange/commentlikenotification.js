import amqp from 'amqplib';

async function receiveNotification() {
    try {
        const connection=await amqp.connect("amqp://localhost:5672");
        const channel=await connection.createChannel();

    const exchange="header_exchange";
    const exchangeType="headers";

    await channel.assertExchange(exchange,exchangeType,{durable:true});

    const queue=await channel.assertQueue("",{exclusive:true});

    console.log("Waiting for video notifications with specific headers");

    await channel.bindQueue(queue.queue,exchange,"",{
        "x-match":"any",
        "notification-type-comment":"comment",
        "notification-type-like":"like"
    });

    channel.consume(queue.queue,(msg)=>
    {
        if(msg!=null)
        {
            const message=JSON.parse(msg.content.toString());
            console.log("Receiving any matching notification: ",message);
            channel.ack(msg);
        }
    },{
        noAck:false
    });
    } catch (error) {
        console.error("Error in Header Notification Consumer:", error);
    }
}

receiveNotification();