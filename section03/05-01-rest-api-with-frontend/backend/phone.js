export function checkVaild (myphone) {
  if(myphone.length != 10 && myphone.length != 11){
    return false
  }else{
    return true
  }
}

export function gettoken (){
  const mytoken = 6
  const  result = String(Math.floor(Math.random() *10 ** mytoken)).padStart(mytoken,"0")
  return result
}

export function sendsms (myphone,mytoken) {
  console.log(myphone + '번호로 인증번호' + mytoken + '를 전송합니다!!')
}