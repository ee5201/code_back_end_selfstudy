export function CheckIsvaild (myphone) {
  if(myphone.length !== 10 && myphone.length !== 11){
    console.log("에러 발생!!! 핸드폰 번호를 제대로 입력해 주세요!!!")
    return false
  }else{
    return true
  }
}


export function gettoken(myphone) {
  const token = 6
  if(myphone === undefined){
      console.log("에러발생한다. 갯수로 입력해주세요")
      return;
  }else if(myphone <=0){
      console.log("에러발생 !! 갯수가 너무 적습니다.")
      return;
  }else if(myphone < 11){
      console.log("에러발생")
      return;
  }
  const result = Math.floor(Math.random() * 10 ** token)
  console.log(result)
  return result
}

export function getmessagetophone (myphone,token) {
  console.log(`${myphone}으로 ${token}인증번호 입니다.`)
}