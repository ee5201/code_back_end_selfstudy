import  express  from "express";
import { CheckPhone, GetToken, sendtophone } from "./phone.js";

const app = express()
app.use(express.json())

app.get("/boards", (req,res)=>{
  const result = [
    {name:"짱구",age:12},
    {name:"맹구",age:12},
    {name:"철수",age:12},
    {name:"유리",age:12},
    {name:"훈이",age:12}
  ]
  res.send(result)
})

app.post("/token/phone",(req,res)=>{
  const myphone = req.body.aaa
  const isVaild =CheckPhone(myphone)
  if(isVaild){
    const token = GetToken()
    sendtophone(myphone,token)

  }
  res.send("인증완룐")
})
app.listen(3000,()=>{
  console.log(`localhost${3000} processing`)
})