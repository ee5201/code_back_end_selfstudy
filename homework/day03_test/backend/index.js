import express, { json } from "express"
import swaggerUi from "swagger-ui-express"
import swaggerJSDoc from "swagger-jsdoc";
import { options } from "./swagger/config.js";
import cors from "cors";


const app = express()
app.use(express.json())
app.use(cors())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)))

app.get('/', function (req, res) {
  const result = [
    { 
      email : "aaa@gmail.com", 
      name : "짱구",
      phone : "010-1234-5678",
      personal : "220110-2222222",
      prefer : "https://naver.com"
    },
    { 
      email : "aaa@gmail.com", 
      name : "유리",
      phone : "010-1234-5678",
      personal : "220110-2222222",
      prefer : "https://naver.com"
    },{ 
      email : "aaa@gmail.com", 
      name : "맹구",
      phone : "010-1234-5678",
      personal : "220110-2222222",
      prefer : "https://naver.com"
    },{ 
      email : "aaa@gmail.com", 
      name : "훈이",
      phone : "010-1234-5678",
      personal : "220110-2222222",
      prefer : "https://naver.com"
    },{ 
      email : "aaa@gmail.com", 
      name : "철수",
      phone : "010-1234-5678",
      personal : "220110-2222222",
      prefer : "https://naver.com"
    }
  ]
  res.send(result)
})

app.get("/starbucks",(req,res)=>{
  const coffelist = [
    { name: '아메리카노', kcal: 5 },
    { name: '카페라떼', kcal: 10 },
    { name: '콜드브루', kcal: 15 },
    { name: '카페모카', kcal: 50 },
    { name: '돌체라뗴', kcal: 500 },
    { name: '카라멜라뗴', kcal: 200 },
    { name: '바닐라라뗴', kcal: 20 },
    { name: '에스프레소', kcal: 1 },
    { name: '디카페인', kcal: 5 },
    { name: '오트라뗴', kcal: 300 },
  ]
  res.send(coffelist)
})

app.listen(3000,()=>{
  console.log(`Example app listening on port ${3000}`)
})