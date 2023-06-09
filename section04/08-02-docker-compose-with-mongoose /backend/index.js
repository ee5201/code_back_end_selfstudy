import express from "express";
import { checkVaild, getToken, sendTokenToSMS } from "./phone.js";
import cors from "cors";
import {
  CheckValidationEmail,
  GetWelcomeTemplate,
  SendWelcomeTemplateToEmail,
} from "./email.js";
import mongoose from "mongoose";
import { Board } from "./models/board.mode.js";

const app = express();
app.use(cors());
app.use(express.json());

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc()));

app.get("/boards", async (req, res) => {
  // const result = [
  //   {number:1 , writer:"철수",title:"제목입니다.",contents:"내용이에요",Phone:"01012345678"},
  //   {number:2 , writer:"훈수",title:"훈제목입니다.",contents:"훈내용이에요",Phone:"01012345278"},
  //   {number:3 , writer:"김수",title:"김제목입니다.",contents:"김내용이에요",Phone:"01012345378"}

  // ]
  const result = await Board.find();
  res.send(result);
});

app.post("/boards", async (req, res) => {
  console.log(req.body);
  //1 .데이터를 등록하는 로직 => DB에 접속해서 데이터 저장하기
  const board = new Board({
    writer: req.body.writer,
    title: req.body.title,
    contents: req.body.contents,
  });
  await board.save();

  res.send("게시물 등록이 완료되었습니다.");
});

app.post("/token/phone", (req, res) => {
  const myphone = req.body.aaa;
  console.log(myphone);

  const isValid = checkVaild(myphone);
  if (isValid) {
    const mytoken = getToken();

    sendTokenToSMS(myphone, mytoken);
    res.send("인증완료!!");
  }
});

app.post("/users", (req, res) => {
  const user = req.body.myuser;
  // 1. 이메일이 정상인지 확인(1-존재여부, 2-"@"포함여부)
  const isValid = CheckValidationEmail(user.email);
  if (isValid) {
    // 2. 가입환영 템플릿 만들기
    const template = GetWelcomeTemplate(user);

    // 3. 이메일에 가입환영 템플릿 전송하기
    SendWelcomeTemplateToEmail(user.email, template);
    res.send("가입완료!!!");
  }
});

//몽고DB 접속!!
mongoose
  .connect("mongodb://my-database:27017/mydocker03")
  .then(() => console.log("db에 연결하였습니다."))
  .catch(() => console.log("db에 접속에 실패하였습니다. "));

// backend API 서버 오픈 !!
app.listen(3000, () => {
  console.log(`Example app listening on port ${3000}`);
});
