import express from "express"
import CashService from "./cash.js"
import ProductService from "./product.js"

const app = express()

// 상품 구매하기 



app.post("/products/buy", (req,res)=>{
  // 1. 가진 돈검증하는 코드 
  const cashsevice = new CashService()
  const hasmoney = cashsevice.checkValue() // true Ehsms false 리턴

  //2. 판매 여부 검증하느 코드(대략 10줄 => 2줄)

  const producetsevice = new ProductService()
  const isSoldout=  producetsevice. checkSoldout()

  //3. 상품 구매하는 코드
  if(hasmoney && !producetsevice){
      res.send("상품 구매 완료 ")
  }

  res.send("상품구매완료")
})





// 상품 환불하기
app.post("/products/refund", (req,res)=>{
   // ()=>{} 미들웨어 함수

  const producetsevice = new ProductService()
  const isSoldout=  producetsevice. checkSoldout()

  //2. 상품 환불하는코드 
    if(isSoldout){
    res.send("상품 환불 완료 ")
  }



  res.send("상품환불완료")
}) // ()=>{} 미들웨어 함수





app.listen(3000)