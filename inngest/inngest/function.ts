import { inngest } from "./client";
import 'dotenv/config';


export const helloWorld = inngest.createFunction(
  {
    id: "hello-world",
  },
  {
    event: "test/hello-world",
  },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    await step.run("llm-call", async () => {
      return `Hello ${event.data.email}!`;
    });

    return { message: `Hello ${event.data.email}!` };
  }
);

export const sumerizetext = inngest.createFunction(
  { id: "summarize-text" },
  { event: "text/summarize" },
  async ({ event, step }) => {
    const { text } = event.data;

    // Step 1: LLM call
    const llmresult = await step.ai.infer("llm-call", {
      model: step.ai.models.gemini({
        model: "gemini-1.5-flash",
        apiKey: process.env.GEMINI_API_KEY!,
      }),
      body: {
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `Summarize the following text concisely:\n\n${text}`,
              },
            ],
          },
        ],
      },
    });

    // Step 2: Save to DB
    const dbResult = await step.run("save-to-db", async () => {
      const part = llmresult.candidates?.[0]?.content?.parts?.[0];
      const content =
        part && "text" in part ? part.text : "";

      console.log("saving to db", content);
      return { content, id: Math.floor(Math.random() * 1000) };
    });

    // Step 3: Send email
    const result = await step.invoke("email", {
      function: "send-email",
      data: {
        email: "ayushgudigar979@gmail.com",
        summary: dbResult.content,
      },
    });

    return {
      done: true,
      summary: dbResult.content,
      resultfromemail: result,
    };
  }
);


export const functions = [helloWorld, sumerizetext];
