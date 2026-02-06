import { serve } from "inngest/next";
import { inngest } from "../../../inngest/client";
import { functions } from "../../../inngest/function";
import dotenv from "dotenv";
dotenv.config();

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: functions
  ,
});