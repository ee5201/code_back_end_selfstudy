import express from "express"
import { checkVaild, getToken, sendTokenToSMS } from "./phone.js"
import cors from 'cors';
import { CheckValidationEmail, getWelcomeTemplate, sendWelcomeTemplateToEmail } from "./email.js";



const app = express()
app.use(cors())
app.use(express.json())

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc()));

app.get('/boards',(req,res) => {
  const result = [
    {number:1 , writer:"철수",title:"제목입니다.",contents:"내용이에요",Phone:"01012345678"},
    {number:2 , writer:"훈수",title:"훈제목입니다.",contents:"훈내용이에요",Phone:"01012345278"},
    {number:3 , writer:"김수",title:"김제목입니다.",contents:"김내용이에요",Phone:"01012345378"}

  ]
  res.send(result)

} )  

app.post('/boards', (req,res)=>{
  console.log(req.body)

  res.send("게시물 등록이 완료되었습니다.")
})

app.post('/token/phone',(req,res)=>{
  const myphone = req.body.aaa
  console.log(myphone)

  const isValid = checkVaild(myphone);
  if(isValid){
    const mytoken = getToken();

    sendTokenToSMS(myphone,mytoken);
    res.send("인증완료!!")
  }
})

app.post('/users',(req,res)=>{
  const user =req.body.aaa
  	// 1. 이메일이 정상인지 확인(1-존재여부, 2-"@"포함여부)
    const isValid = CheckValidationEmail(user.email);
    if (isValid) {
      // 2. 가입환영 템플릿 만들기
      const template = getWelcomeTemplate(user);
  
      // 3. 이메일에 가입환영 템플릿 전송하기
      sendWelcomeTemplateToEmail(user.email, template);
      res.send("가입완료!!!")
    }
})


app.listen(3000, () => {
  console.log(`Example app listening on port ${3000}`)
})
