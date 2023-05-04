import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { checkisvaild, getsmstophone, gettoken } from './phone.js';

// The GraphQL schema
const typeDefs = `#graphql

  type Query {
    hello: String
  }

  type Mutation {
    CreateBoardPhone(myphone:String):String
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    hello: () => 'world',
  },
  
  Mutation:{
    CreateBoardPhone: (_,arg) =>{
        
      const isvaild = checkisvaild(arg.myphone)
      if(isvaild){
        const token = gettoken()
        getsmstophone(arg.myphone,token)
        return "인증완료"
      }
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server,{
  listen:{port:3000}
});
console.log(`🚀 Server ready at ${url}`);