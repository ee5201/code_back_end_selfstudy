import express from 'express'
import { CouponController } from './MVC/controller/cupon.controller'

const app = express()

const couponController = new CouponController()
app.post('/coupons/buy',couponController.buyCupon)

app.listen(3000)

b