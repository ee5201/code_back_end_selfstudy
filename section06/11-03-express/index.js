import express from "express"

const app = express()

// 상품 구매하기 

app.post("/products/buy", (req,res)=>{

  // 1. 가진 돈검증하는 코드 
  // ...
  // ...
  // ...

  //2. 판매 여부 검증하느 코드(대략 10줄)


  //3. 상품 구매하는 코드
  //if(돈있음 && !판매완료){
      //res.send("상품 구매 완료 ")
  // }

  res.send("상품구매완료")
}) // ()=>{} 미들웨어 함수

// 1. 가진 돈검증하는 코드 
  // ...
  // ...
  // ...

  //2. 상품 환불하는코드 
  //  if(판매완료){
  //  res.send("상품 환불 완료 ")
  // }





// 상품 환불하기
app.post("/products/refund", (req,res)=>{



  res.send("상품환불완료")
}) // ()=>{} 미들웨어 함수





app.listen(3000)