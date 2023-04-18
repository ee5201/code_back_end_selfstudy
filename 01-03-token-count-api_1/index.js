function CTP (myphone) {
  if(myphone.length !== 10 && myphone.length !== 11){
    console.log("에러발생 !! 핸드폰 번호를 제대로 입력해주세요")
    return;
  }

  //2 핸드폰 토큰 6자리 만들기 
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
}

CTP("010919052012")