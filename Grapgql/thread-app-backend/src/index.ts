import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { expressMiddleware } from "@as-integrations/express5";
import createApolloServer from "./graphql/index.js";
import UserService from "./services/user.js";


async function startServer() {
  const app = express();

  const port = process.env.PORT || 3000;

  app.use(express.json());

  //create a apollo server instance

  //start the gql server

  const server = await createApolloServer();

  app.use("/graphql", expressMiddleware(server, {context: async({req}) => {
     const token=req.headers['token'] || '';
     try {
      const user=UserService.decodeJWTToken(token as string);
      if(!user) throw new Error("Invalid token");
      return {user};
     } catch (error) {
      return {}
     }

     return { token };
  }}));
  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
}

startServer();
