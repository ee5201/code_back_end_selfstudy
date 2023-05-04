export function CheckPhone(myphone){
  if(myphone.length !== 10 || myphone.length !== 11 ){
    return true
  }else{
    return false
  }
}

export function sendtophone (myphone,mytoken){
  console.log(myphone+"번호로 인증번호"+mytoken+"를전송하였습니다.")
}

export function GetToken() {
  const token = 6;
  const result = String(Math.floor(Math.random()*10 ** token)).padStart(6,"0")
  return result
}