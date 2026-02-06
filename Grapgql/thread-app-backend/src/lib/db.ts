import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL!;

//create a connection pool(In your code, the Pool from the pg (node-postgres) library is used to manage a collection of reusable database connections. Without a pool, every request would have to open and then close a new connection, which is extremely slow and resource-intensive. )
const pool = new Pool({ connectionString });
//create an adapter(In your code, the adapter (PrismaPg) acts as a bridge or "translator" between the Prisma Client and your native JavaScript database driver (pg). )
const adapter = new PrismaPg(pool);

export const prismaClients = new PrismaClient({ adapter });
