import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers/index";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const main = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async () => {
      return {
        prisma,
      };
    },
  });

  console.log(`🚀  Server ready at: ${url}`);
};

main();
