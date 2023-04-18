import express from"express"
import cors from "cors"
import { Board } from "./models/board.mode.js"
import mongoose from "mongoose"
import { checkValidationPhone, getTokentophone, sendTokenToPhone } from "./phone.js"

const app = express()
app.use(express.json())
app.use(cors())

await mongoose.connect('mongodb://my-database:27017/mydocker01');

app.get("/token/phone", async (req,res)=>{
  const result = await Board.find()
  res.send(result)
})

app.post('/token/phone', async (req, res) => {
  const myphone = req.body.phone
  const isValidPhone = checkValidationPhone(myphone)

  if (!isValidPhone) {
    return res.status(400).send('올바른 핸드폰 번호가 아닙니다.')
  }

  const existingBoard = await Board.findOne({ phone: myphone })

  if (existingBoard) {
    // 기존에 저장된 핸드폰 번호가 있으면 최신 토큰으로 덮어씌웁니다.
    const newToken = getTokentophone()
    sendTokenToPhone(myphone, newToken)

    existingBoard.token = newToken
    existingBoard.isAuth = false
    await existingBoard.save()
    return res.status(200).send('핸드폰 번호 업데이트 완료')
  } else {
    // 새로운 핸드폰 번호라면 새로운 Board를 생성합니다.
    const newBoard = new Board({
      token: getTokentophone(),
      phone: myphone,
      isAuth: false
    })
    await newBoard.save()
    sendTokenToPhone(myphone, newBoard.token)
    return res.status(200).send('핸드폰 번호 등록 완료')
  }
})

app.listen(3000, () => {
  console.log(`Example app listening on port ${3000}`)
})