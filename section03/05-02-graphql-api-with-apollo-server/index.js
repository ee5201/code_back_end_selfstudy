import {ApolloServer} from "@apollo/server"
import { startStandaloneServer } from '@apollo/server/standalone';


const typeDefs = `#graphql
  type Query {
    hello: String
  }
`;


const resolvers = {
  Query: {
    hello: () => 'world',
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server,{
  listen:{port:3000}
});
console.log(`🚀 Server ready at ${url} on port ${3000}`);