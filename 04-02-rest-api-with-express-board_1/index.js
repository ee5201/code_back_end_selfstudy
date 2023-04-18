import express from "express"

const app = express()

app.get("/boards" , (req,res)=>{
  const result =[
    {name:"짱구",age:12},
    {name:"맹구",age:12},
    {name:"철수",age:12},
    {name:"유리",age:12},
    {name:"훈이",age:12}
  ]
  res.send(result)
})

app.listen(3000,()=>{
  console.log(`localhost ${3000} process`)
})