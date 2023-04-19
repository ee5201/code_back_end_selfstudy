import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// The GraphQL schema
const typeDefs = `#graphql

  input CreateBoardInput {
    writer:String
    title:String
    contents:String
  }

  type BoardReturn {
    number:Int
    writer:String
    title:String
    contents:String
    phone:String
  }

  type Query{
    fetchBoard:[BoardReturn]
  }

  type Query {
    hello: String
  }

  type Mutation {
    CreateBoard(writer:String,title:String,contents:String):String,
    CreateBoard2(createBoardInput:CreateBoardInput):String

  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    hello: () => 'world',
  },
  Query:{
    fetchBoard: () =>{
      //1. 데이터를 등록하는 로직 => db에 접속해서 데이터 꺼내오기 
      const result = [
        {number:1 , writer:"철수",title:"제목입니다.",contents:"내용이에요",Phone:"01012345678"},
        {number:2 , writer:"훈수",title:"훈제목입니다.",contents:"훈내용이에요",Phone:"01012345278"},
        {number:3 , writer:"김수",title:"김제목입니다.",contents:"김내용이에요",Phone:"01012345378"}     
      ]
      return result
    }
  },

  Mutation:{
    CreateBoard:(_,arg) =>{
        console.log(arg)

        return "등록완료하였습니다."
    },
    CreateBoard2:(_,arg) =>{
      console.log(arg)

      return "등록완료하였습니다."
  },


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