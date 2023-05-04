function CreateTokenofphone (myphone) {
  if(myphone.length !== 10 || myphone.length !== 11){
    console.log("에러발생!!! 핸드폰 번호를 제대로 입력해ㅜ세요")
  }

  // 2 핸드폰 토큰 6자리 만들기 
  const token =6;
  const gettoken = String(Math.floor(Math.random()*10 **token)).padStart(token,"0")
  console.log(gettoken)

  console.log(myphone+"번호로 인증번호"+gettoken+"를 전송하였습니다.")

}

CreateTokenofphone("01091905201")