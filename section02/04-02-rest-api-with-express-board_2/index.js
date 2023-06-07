import express from "express";
import { CheckPhone, sendTokenSMS, getToken } from "./phone.js";

const app = express();
app.use(express.json());

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
  const qqq = req.body.phone;
  console.log(qqq);
  const isVaild = CheckPhone(qqq);
  // 2. 핸드폰 토큰 6자리 만들기
  if (isVaild) {
    const Token = getToken(qqq);
    //3. 전송하기
    sendTokenSMS(qqq, Token);
  }
  res.send("등록이 완료 되었습니다. ");
});

app.listen(3000, () => {
  console.log(`localhost ${3000} process`);
});
