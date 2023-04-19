import coolsms from 'coolsms-node-sdk'
import 'dotenv/config'

export function checkVaildation (myphone) {
  if(myphone.length !== 10 && myphone.length !== 11 ){
    return false;
  }else{
    return true;
  }
}

export function GetToken () {
  const mycount = 6 

  const result = String(Math.floor(Math.random()*10 ** mycount)).padStart(mycount,"0")
  return result;
}



export async function sendTokenToSms(myphone,gettoken) {
  const SMS_KEY = process.env.SMS_KEY
  const SMS_SECRET = process.env.SMS_SECRET
  const SMS_SENDER = process.env.SMS_SENDER

  const mysms = coolsms.default
  const messageService = new mysms(SMS_KEY ,SMS_SECRET)
  const result = await messageService.sendOne(
    {
      to: myphone,
      from: SMS_SENDER,
      text: `윤정아아아 사랑해용 사랑해 인증번호${gettoken}`
    }
  )
  console.log(result)
}
