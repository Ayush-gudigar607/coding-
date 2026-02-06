"use server"

import { inngest } from "../inngest/client";




export async function triggerHelloWorld() {

    await inngest.send({
        //MAINLY HELP FOR TRIGERING THE EVENT
        name:'test/hello-world',
        data:{
            email:"ayushgudigar979@gmail.com"
        }
    });
}

export const triggerSummerizetext=async(text:string)=>{

    await inngest.send({
        name:'text/summarize',
        eventKey: process.env.INNGEST_EVENT_KEY,
        data:{
            text
        }

})};
