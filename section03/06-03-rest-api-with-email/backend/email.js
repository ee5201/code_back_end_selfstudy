import nodemailer from 'nodemailer'
import 'dotenv/config'

export function checkVaildationEmail (email) {
  if(email === undefined && !email.includes("@")){
    console.log("에러발생")
    return false
  }else{
    return true
  }


}

export function getWelcomeTemplate (user) {
  return `
  <html>
    <body>
        <h1> ${user.name}님 가입을 환영합니다.</h1>
        <hr/>
        <div>이름: ${user.name} </div>
        <div>나이: ${user.age} </div>
        <div>학교: ${user.school} </div>
    </body>
  </html>
  `
}

export async function sendtemplateToSms (email,template) {
  const EMAIL_USER = process.env.EMAIL_USER
  const EMAIL_PASS = process.env.EMAIL_PASS
  const EMAIL_SENDER = process.env.EMAIL_SENDER

  const trans = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user: EMAIL_USER,
        pass: EMAIL_PASS
    }
  })

  const result = await trans.sendMail({
    from: EMAIL_SENDER,
    to: email,
    subject: "오오오 힘내자!",
    html: template
  })
  console.log(result)

}