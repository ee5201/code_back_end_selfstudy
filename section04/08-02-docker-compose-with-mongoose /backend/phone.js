import coolsms from "coolsms-node-sdk"
import 'dotenv/config'







export function checkVaild (myphone) {
  if (myphone.length !== 10 && myphone.length !== 11) {
    console.log('에러 발생!!! 핸드폰 번호를 제대로 입력해 주세요!!!');
    return false;
} else {
    return true;
}
}

export function getToken () {
  const mycount = 6
  if(mycount === undefined){
    console.log("에러발생 !! 갯수를 제대로확인바람")
    return;
  }else if(mycount <= 0){
    console.log("갯수가 너무 적습니다.")
    return;
  }else if(mycount > 10){
    console.log('에러 발생')
  }

  const result = String(Math.floor(Math.random() * 10 ** mycount)).padStart(
    mycount,
    '0',
);
return result;
// console.log(result)
}

export async function sendTokenToSMS(fff, ggg) {
  const SMS_KEY = process.env.SMS_KEY
  const SMS_SECRET = process.env.SMS_SECRET
  const SMS_SENDER= process.env.SMS_SENDER


  const mysms = coolsms.default

const messagesevice = new mysms(SMS_KEY,SMS_SECRET)
//key //scret
const result = await messagesevice.sendOne({
  to: fff,
  from: SMS_SENDER,
  text: `안녕하세요 고구마님 저는 핵감자입니다 당신을 사모합니다. 인증번호 ${ggg}`
})
console.log(result)
  
  // console.log(fff + '번호로 인증번호' + ggg + '를 전송합니다!!');

}