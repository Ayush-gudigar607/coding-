import amqp from 'amqplib';

async function sendMail()
{
    try {
        const connection=await amqp.connect('amqp://localhost:5672')
        const channel=await connection.createChannel();

        const exchange="mail_exchange";
        const routingKey_sub="send_mail_sub";
        const routingKey_user="send_mail_user";

        const message={
            from:"ayushgudigar979@gmail.com",
            to:"ayushgudigarbe@gmail.com",
            subject:"Hello TP Mail",
            body:"This is a test mail from TP Mail Service"
        }

        // Assert exchange (direct-type durable- false means data can be lost if rabbitmq server restarts)
        await channel.assertExchange(exchange,'direct',{durable:false});

        //create the queue(durable-false means data can be lost if rabbitmq server restarts)
        await channel.assertQueue('subcribed_queue',{durable:false});

        await channel.assertQueue('user_queue',{durable:false});

        //bind the queue to the exchange with routing key
        await channel.bindQueue('subcribed_queue',exchange,routingKey_sub)

        //excange and queue does not have any direct relation until we bind them
        await channel.bindQueue('user_queue',exchange,routingKey_user);

        //publish the message to the exchange with routing key
        channel.publish(exchange,routingKey_user,Buffer.from(JSON.stringify(message)));

        console.log("Mail data was sent successfully",message);

        setTimeout(() => {
            connection.close();
        }, 5000);
    } catch (error) {
        throw new Error("sendMail Error");
        
    }
}

sendMail();