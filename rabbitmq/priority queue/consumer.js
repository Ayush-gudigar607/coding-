import amqp from 'amqplib';

async function receiveNotification() {
    try {
        const connection=await amqp.connect("amqp://localhost:5672");
        const channel=await connection.createChannel();
        
        const queue="priority_queue";

        await channel.assertQueue(queue,{durable:true,arguments:{"x-max-priority":10}});

        console.log("Waiting for messages in Priority Queue");
        await channel.consume(queue,(msg)=>
        {
            if(msg!==null)
            {
                const message=JSON.parse(msg.content.toString());
                console.log(`[Priority Queue] Received message with priority ${msg.properties.priority}: `,message);
                channel.ack(msg);
            }
        }
        );

    } catch (error) {
     console.error("Error in Priority Queue Consumer:", error);   
    }
}

receiveNotification();