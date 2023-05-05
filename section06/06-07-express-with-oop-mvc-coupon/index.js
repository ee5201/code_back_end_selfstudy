import express from 'express'
import { CouponController } from './MVC/controller/cupon.controller'

const app = express()

const couponController = new CouponController()
app.post('/coupons/buy',couponController.buyCupon) 


//husky

app.listen(3000)
