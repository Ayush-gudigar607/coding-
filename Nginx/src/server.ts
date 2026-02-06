import cluster,{Worker} from "cluster";
import http from "http";
import { rootConfigSchema, type ConfigSchemaType } from "./config.Schema.js";
import type { workerMessageType,workerMessageReplyType} from "./server-schema.js";
import { workerMessageSchema,workerMessageReplySchema} from "./server-schema.js";

interface CreateServerConfig {
  port: number;
  workerCount: number;
  config: ConfigSchemaType;
}

export async function createServer(config: CreateServerConfig) {
  const { workerCount, port } = config;
  const workers = new Array(workerCount);
  const WORKER_POOL: Worker[] = [];
  if (cluster.isPrimary) {
    console.log(`Primary ${port} is running`);

    //This will create worker nodes
    console.log("Length of workers:", workers.length);
    for (let i = 0; i < workerCount; i++) {
      //create worker node
      const w = cluster.fork({ config: JSON.stringify(config.config) });
      WORKER_POOL.push(w);

      console.log(
        `Master Process: worker Node ${w.process.pid} spin up (${i}/${workerCount-1})`
      );
    }

    const server = http.createServer((req, res) => {
       const index=Math.floor(Math.random()*WORKER_POOL.length);
       const worker=WORKER_POOL.at(index);

       if(!worker){
        throw new Error("No worker available");
       }

       const payload:workerMessageType={
        requestType:'HTTP',
        headers:req.headers,
        body:'',
        url:req.url || ''
       }

       worker.send(JSON.stringify(payload));
       
       res.writeHead(200);
       res.end('Request forwarded to worker');
    });

    server.listen(config.port, () => {
        console.log(`Server listening on port ${config.port}`);
    });

  } else {
    //Worker node logic here
    console.log(`🔵 Worker Node ${process.pid} started`);
    const config = await rootConfigSchema.parseAsync(
      JSON.parse(process.env.config || "{}")
    );

    process.on("message", async (message:string) => {
        const messageValidated=await workerMessageSchema.parseAsync(JSON.parse(message));

const requestURL=messageValidated.url;
const rule=config.server.rules.find(e=>e.path===requestURL);

let reply:workerMessageReplyType;
if(!rule) {
    reply={
        error:"No matching rule found",
        errorCode:404
    };
} else {
    reply={
        error:"",
        errorCode:200
    };
}

if(process.send) {
    process.send(JSON.stringify({
        reply
    }));
}

if(!rule) {
    return;
}

const upstreamID=rule.upstreams[0];
if(!upstreamID) {
    reply={
        error:"No upstreams defined for this rule",
        errorCode:502
    };
}
    });
  }
}