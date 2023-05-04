

export class ProductController {
  moneyService;


  constructor(moneyService,ProductService) {
    this.moneyService = moneyService
    this.ProductService = ProductService
        
  }
  Buyproduct = (req,res) =>{
      

      // 1. 가진 돈을 검증하는 코드 (10줄 정도 작성)
      const hasMoney = this.moneyService.Checkvalue() //true  또는 false 리턴

      // 2.판매 여부 검증하는 코드 ( 대략 10줄 정도) 10줄 -> 2줄
            // const checkSoldOut = new ProductService()
            const isSoldout = this.ProductService.CheckSoldOut() //true  또는 false 리턴

      // 3. 상품 구매하는 코드 
      if(hasMoney && !isSoldout){
        res.send("상품 구매완료 ")
  }

  //많은 코드를 한줄로 하는 것을 추상화 하는것 

  }

  Refundproduct = (req,res) =>{
     // 2.판매 여부 검증하는 코드 ( 대략 10줄 정도)
    //  const productService = new ProductService()
     const isSoldout = this.ProductService.CheckSoldOut()

      // 2. 상품 환불하는 코드 
      if (isSoldout) {
      res.sned("상품 환불 완료")
      }



      res.send("상품 환불 완료!!!")

  }
}