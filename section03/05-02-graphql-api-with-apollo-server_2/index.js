import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import cors from "cors";
// The GraphQL schema
const typeDefs = `#graphql 

input CreateBoardsInput {
  writer:String,
  Title:String,
  Contents:String  
  }

type MYRESULTTYPE {
  name:String,
  age:Int
}

  type Query {
    # fetchboards: String #객체 한개 의미
    fetchboards: [MYRESULTTYPE] #배열안에 객체 1개 이상을 의미
  }
  type Mutation{
    # createBoards(writer:String,Title:String,Contents:String):String
    createBoards(createBoardsInput:CreateBoardsInput!):String
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    fetchboards: () => {
      const result = [
        { name: "철수", age: 12 },
        { name: "맹구", age: 12 },
        { name: "훈이", age: 12 },
        { name: "짱구", age: 12 },
        { name: "유리", age: 12 },
      ];
      return result;
    },
  },
  Mutation: {
    createBoards: (_, args) => {
      console.log(args.createBoardsInput.writer);
      console.log(args.createBoardsInput.Title);
      console.log(args.createBoardsInput.Contents);

      return "게시물 등록에 성공하였습니다. ";
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  cors: true,
  // cors: {origin: ["https://naver.com" , "https://daum.net"]}
});

const { url } = await startStandaloneServer(server);
console.log(`🚀 Server ready at ${url}`);
