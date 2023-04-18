import express from "express"

const app = express()
app.get("/board",(req,res)=>{
  res.send("실행하였습니다.")
})

app.listen(3000,()=>{
  console.log(`localhost${3000} preocess`)
})