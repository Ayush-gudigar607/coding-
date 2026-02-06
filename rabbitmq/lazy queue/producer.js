import amqp from 'amqplib';


async function setup(message) {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();

    const exchangeName="notification_exchange";
    const queueName="lazy_queue";
    const routingKey="lazy.queue*";

    await channel.assertExchange(exchangeName,'topic',{durable:true});

    await channel.assertQueue(queueName,{durable:true},{arguments:{
        //it will store by default in ROM memory but with lazy it will store in disk memory
        "x-queue-mode":"lazy",
    }});

    await channel.bindQueue(queueName,exchangeName,routingKey);
    
    const msg=JSON.stringify(message);
    channel.publish(exchangeName,routingKey,Buffer.from(msg),{persistent:true});

    console.log(`Message sent:${message}`);

    await channel.close();
    await connection.close();

}

setup("hello Bangalore")
