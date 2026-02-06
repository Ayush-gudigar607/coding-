import amqp from 'amqplib';

async function sendMessage(routingKey, message)
{
    try {
        const connection=await amqp.connect('amqp://localhost:5672')
        const channel=await connection.createChannel();

        const exchange="notification_exchange";
        const exchangeType="topic"

        // Assert exchange (direct-type durable- false means data can be lost if rabbitmq server restarts)
        await channel.assertExchange(exchange,exchangeType,{durable:true});

        //publish the message to the exchange with routing key(persistent:true to save the message to disk)
        channel.publish(exchange,routingKey,Buffer.from(JSON.stringify(message)),{persistent:true});

        console.log(" [x] sent '%s':'%s'", routingKey, JSON.stringify(message));

        console.log(`Mes was send! with routing key as ${routingKey}`);

        console.log("Mail data was sent successfully",message);

        setTimeout(() => {
            connection.close();
        }, 5000);
    } catch (error) {
        throw new Error("sendMail Error");
        
    }
}

sendMessage("order.placed",{orderId:12345,status:"placed"});
sendMessage("payment.processed",{paymentId:67890,status:"processed"});