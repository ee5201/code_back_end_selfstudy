import express from "express"
import { Checkvailddation, gettoken, Sendtokentosms } from "./phone.js"

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  const result = [
    {number:1 , writer:"철수",title:"제목입니다.",contents:"내용이에요",Phone:"01012345678"},
    {number:2 , writer:"훈수",title:"훈제목입니다.",contents:"훈내용이에요",Phone:"01012345278"},
    {number:3 , writer:"김수",title:"김제목입니다.",contents:"김내용이에요",bPhone:"01012345378"}
  ]
  res.send(result)
})

app.post('/boards',(req,res)=>{
  console.log(req.body)

  res.send("게시물등록에 성공하였습니다.")
})

app.post('/token/phone',(req,res)=>{
  const myphone = req.body.aaa
  console.log(req.body)
  const isvaild = Checkvailddation(myphone)
  if(isvaild){

  const mytoken = gettoken()

  Sendtokentosms(myphone,mytoken)
  res.send("인증완료")


  }


})

app.listen(3000,() =>{
  console.log(`Example app listening on port ${3000}`)
})