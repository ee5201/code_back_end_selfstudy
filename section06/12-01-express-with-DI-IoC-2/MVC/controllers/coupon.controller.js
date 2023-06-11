import { CashService } from "./services/cash.service.js"

export class CuponController {
    constructor (moneyService) {
        this.moneyService = moneyService
    }
    buyCoupone = (req,res) =>{

       // 1. 가진 돈을 검증하는 코드 (10줄 정도 작성)
    // const cashService = new CashService()
    const hasMoney = this.moneyService.Checkvalue() //true  또는 false 리턴

    // 2. 상품 구매하는 코드 
    if(hasMoney){
    res.send("쿠폰 구매완료 ")
    }

    }
}