import coolsms from "coolsms-node-sdk"
import 'dotenv/config'

export const checkValidationPhone = (user) =>{
    if(user.length !== 10 && user.length !==11) {
      console.log('에러 발생!!! 핸드폰 번호를 제대로 입력해 주세요!!!');
      return fasle
    }else{
      return true
    }
}

export const getTokentophone = () =>{
  const tokennum = 6
  const result= String(Math.floor(Math.random * 10 ** tokennum))
  return result
}

export const sendTokenToPhone = async(user,getToken) =>{
  const SMS_KEY = process.env.SMS_KEY
  const SMS_SECRET = process.env.SMS_SECRET
  const SMS_SENDER = process.env.SMS_SENDER

  const mysms = coolsms.default
  const messageService = new mysms(SMS_KEY,SMS_SECRET)

  const result = await messageService.sendOne({
    to:user,
    from: SMS_SENDER,
    text: gettoken
  })
  console.log(result)
  
}