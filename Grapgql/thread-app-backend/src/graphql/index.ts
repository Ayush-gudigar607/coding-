 import { ApolloServer } from "@apollo/server";
 import { User } from "./user/index.js";

 
 async function createApolloServer() {
     const server = new ApolloServer({
    //Schema definition language (SDL) goes here
    //If anyone want hello query, it should return string(hello(req) and Sting is nullable)
    typeDefs: `
    ${User.typeDefs}
  type Query{
    ${User.queries}
  }
    type Mutation{
    ${User.mutations}
  }
  `,
    resolvers: {
      Query: {
        ...User.resolvers.queries
       
      },
      Mutation:{
        ...User.resolvers.mutations
      }
    }, //Atual function exists here
  });
   await server.start();
   return server;
    
 }

 export default createApolloServer;
