import express from "express"
import CashService from "./MVC/controller/service/cash.js"
import ProductService from "./product.js"
import {ProductController, ProductController} from "./MVC/controller/product.controller.js"
import {CouponController} from "./MVC/controller/cupon.controller.js"

const app = express()

// 상품 API
const ProductController = new ProductController()
app.post("/products/buy",ProductController.buyproduct())
app.post("/products/refund", ProductController.refundProduct())



// 쿠폰(상품권) 구매하기 API
const couponController = new CouponController()
app.post("/coupons/buy",couponController.buyCupon()) // 상품권 구매하기

app.listen(3000)