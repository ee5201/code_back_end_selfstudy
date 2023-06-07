import express from "express";
import { CheckPhone, sendTokenSMS, getToken } from "./phone.js";
import swaggerUi from "swagger-ui-express";
import { options } from "./swagger/config.js";
import swaggerJSDoc from "swagger-jsdoc";
import cors from "cors";
import { checkemail } from "./email.js";
import { Templete } from "./sendsms.js";
import { SendEmail } from "./Token.js";

const app = express();
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)));
app.use(cors());
app.get("/boards", (req, res) => {
  const result = [
    { name: "철수", age: 12 },
    { name: "맹구", age: 12 },
    { name: "훈이", age: 12 },
    { name: "짱구", age: 12 },
    { name: "유리", age: 12 },
  ];
  res.send(result);
});
app.post("/boards", (req, res) => {
  console.log(req);
  console.log("===================================");
  console.log(req.body);

  res.send("게시물 등록에 성공하였습니다. ");
});

app.post("/tokens/phone", (req, res) => {
  const myphone = req.body.phone;
  console.log(myphone);
  const isVaild = CheckPhone(myphone);
  // 2. 핸드폰 토큰 6자리 만들기
  if (isVaild) {
    const Token = getToken(myphone);
    //3. 전송하기
    sendTokenSMS(myphone, Token);
  }
  res.send("등록이 완료 되었습니다. ");
});

app.post("/users", (req, res) => {
  const { name, age, school, email } = req.body;
  console.log(email);
  const isVaild = checkemail(email);
  if (isVaild) {
    const myTemplete = Templete({ name, age, school });
    SendEmail(myTemplete, email);
  }
  res.send("가입이 완료 되었습니다. ");
});

app.listen(3000, () => {
  console.log(`localhost ${3000} process`);
});
