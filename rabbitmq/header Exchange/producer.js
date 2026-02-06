import amqp from 'amqplib'

async function sendNotification(headers,message){
  try {
    const connection=await amqp.connect("amqp://localhost:5672");
    const channel=await connection.createChannel();

    const exchange="header_exchange";
    const exchangeType="headers";

    await channel.assertExchange(exchange,exchangeType,{durable:true});

    const msg=JSON.stringify(message);
    channel.publish(exchange,"",Buffer.from(msg),{persistent:true,headers});
  
    console.log("Sent notification with headers");

    setTimeout(() => {
      connection.close();
    }, 500);
  } catch (error) {
    console.error("Error in Header Exchange Producer:", error);
  }
}

sendNotification({"x-match":"all","notification-type":"new_video","content-type":"video"},"New video uploaded");
sendNotification({"x-match":"any","notification-type":"live_stream","content-type":"gaming"},"Gaming live stream started");
sendNotification({"x-match":"any","notification-type-comment":"comment","content-type":"vlog"},"New comment on your vlog");
sendNotification({"x-match":"any","notification-type-like":"like","content-type":"vlog"},"Someone liked your vlog");