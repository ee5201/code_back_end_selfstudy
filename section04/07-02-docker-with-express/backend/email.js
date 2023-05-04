import { getToday } from "./utils.js"
import nodemailer from "nodemailer"
import 'dotenv/config'

export  function CheckValidationEmail (email) {
if(email === undefined || !email.includes("@")){
  console.log("에러발생")
  return false
}else{
  return true
}
}

export function getWelcomeTemplate (user) {
  return`
    <html>
        <body>
            <h1> ${user.name}님 가입을 환영합니다.</h1>
            <hr/>
            <div>이름: ${user.name} </div>
            <div>나이: ${user.age} </div>
            <div>학교: ${user.school} </div>
            <div>날짜: ${getToday()}  </div>
        </body>
    </html>
  `
}

export async function sendWelcomeTemplateToEmail (email,mytemp) {
  const EMAIL_USER = process.env.EMAIL_USER
  const EMAIL_PASS = process.env.EMAIL_PASS
  const EMAIL_SENDER = process.env.EMAIL_SENDER

  const transporter = nodemailer.createTransport({
    service:"gmail",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS
    }
  })
  const result = await transporter.sendMail({
    from: EMAIL_SENDER,
    to:email,
    subject: "가입을 축하합니다.",
    html: mytemp
  })
  console.log(result)
// console.log(`${email} 이메일로 ${mytemp} 를전송합니다.`)

}