import {Worker} from 'bullmq'
 const sendEmail=()=>new Promise ((resolve)=>{
    setTimeout(() => {
        resolve(true);
    }, 5000);
 })
const worker=new Worker("email-queue",async(job)=>{
    console.log("Processing job ",job.id);
    // console.log("Job data ",job.data);
    console.log(`Sending Email to this ${job.data.email}`)
    await sendEmail();
    console.log(`Email sent to  ${job.data.email}`);
},{
    connection: {
        host: "127.0.0.1",
        port: 6379,
    },
})

worker.on('completed', (job) => {
    console.log(`Job ${job.id} completed successfully`);
});

worker.on('failed', (job, err) => {
    console.log(`Job ${job?.id} failed with error: ${err.message}`);
});

worker.on('error', (err) => {
    console.error('Worker error:', err);
});

console.log('Worker started and waiting for jobs...');