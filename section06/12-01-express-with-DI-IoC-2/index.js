import express from "express";
import { CashService } from "./MVC/controllers/services/cash.service.js";
import { ProductController} from './MVC/controllers/product.controller.js'
import { CuponController } from "./MVC/controllers/coupon.controller.js";
import {ProductService} from "./MVC/controllers/services/product.service.js"
import {PointService} from "./MVC/controllers/services/point.service.js"

const app = express() 

const cashService = new CashService() // new 한번으로 모든 곳에서 재사용 가능 (싱글톤패턴ㅜ)
const productService = new ProductService()
const pointService = new  PointService()



//상품 API
const productcontroller = new ProductController(cashService,productService)
app.post("/products/buy", productcontroller.Buyproduct ) // 상품 구매하기 
app.post("/products/refund", productcontroller.Refundproduct) // 상품 환불하기

//cupon 구매하기
const cuponcontroller = new CuponController(cashService)
app.post("/cupons/buy", cuponcontroller.buyCoupone) // 쿠폰(상품권) 구매하기

app.listen(3000)