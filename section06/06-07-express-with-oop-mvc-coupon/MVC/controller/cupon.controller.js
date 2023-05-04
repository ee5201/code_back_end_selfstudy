import { CashService } from "./service/cash"

export class CouponController {
  buyCupon = (req,res) =>{
    // 1. 가진동 검증 기능
    // 1. 가진 돈검증하는 코드 
    const cashsevice = new CashService()
    const hasmoney = cashsevice.checkValue() // true 또는 false 리턴
  
    //2. 쿠폰 구매하는 코드
    if(hasmoney){
      res.send("쿠폰 구매 완료 ")
  }
  }
}