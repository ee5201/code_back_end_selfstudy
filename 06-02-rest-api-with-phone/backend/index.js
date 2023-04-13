import express from"express"
import cors from "cors"
import { GetToken, checkVaildation, sendTokenToSms } from "./phone.js"
import { checkVaildationEmail } from "../../06-03-rest-api-with-email/backend/email.js"

const app = express()
app.use(express.json())
app.use(cors())

app.get('/boards',(req,res)=>{
  const result = [
    {number:1 , writer:"철수",title:"제목입니다.",contents:"내용이에요",Phone:"01012345678"},
    {number:2 , writer:"훈수",title:"훈제목입니다.",contents:"훈내용이에요",Phone:"01012345278"},
    {number:3 , writer:"김수",title:"김제목입니다.",contents:"김내용이에요",Phone:"01012345378"}

  ]

  res.send(result)
})

app.post('/boards',(req,res)=>{
  res.send("게시물 등록이 완료하였습니다.")
})

app.post('/token/phone',(req,res)=>{
  const myphone = req.body.aaa

  const isVaild = checkVaildation(myphone)
  if(isVaild){
    const gettoken = GetToken();

    sendTokenToSms(myphone,gettoken);
    res.send("인증완료!!")
  }
})


app.post('/user',(req,res)=>{
  const myUser = req.body.myuser

  const isVaild = checkVaildationEmail(myUser.email)
  if(isVaild){
    const template = getWelcomeTemplate(myUser);

    sendtemplateToSms(myUser,template);
    res.send("인증완료!!")
  }
})

app.listen(3000,()=>{
  console.log(`Example app listening on port ${3000}`)
})