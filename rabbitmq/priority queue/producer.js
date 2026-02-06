import amqp from 'amqplib';

async function sendMessage(routingKey, message)
{
    try {
        const connection=await amqp.connect('amqp://localhost:5672')
        const channel=await connection.createChannel();

        const exchange="priority_exchange";
        const queue="priority_queue";
        const routingKey="priority_routingKey";
        // Assert exchange (direct-type durable- false means data can be lost if rabbitmq server restarts)
        await channel.assertExchange(exchange,'direct',{durable:true});

        // Assert queue (durable- false means data can be lost if rabbitmq server restarts)
        await channel.assertQueue(queue,{durable:true,arguments:{"x-max-priority":10}});

        // Bind queue to exchange with routing key
        await channel.bindQueue(queue,exchange,routingKey);

        const data=[
            {
                msg:"hello high priority",
                priority:9
            },
            {
                msg:"hello low priority",
                priority:1
            },
            {
                msg:"hello medium priority",
                priority:5
            }
        ];

        data.map((item)=>
        {
            channel.publish(exchange,routingKey,Buffer.from(JSON.stringify(item)),{priority:item.priority});
        })

        setTimeout(() => {
            connection.close();
        }, 500);

        console.log("Messages sent to Priority Queue");
        
    } catch (error) {
        throw new Error("sendMail Error");
        
    }
}

sendMessage();