console.log("안녕하세요")

function getToken(aaa){
  if(aaa === undefined){
    console.log("에러발생한다. 갯수르 입력해주세요")
    return;
  }else if(aaa <=0){
    console.log("에러발생 !!! 갯수가 너무 적습니다.")
    return;
  }else if(aaa >10){
    console.log("에러발생 !! 갯수가 너무 많습니다.")
    return;
  }
  const result = Math.floor(Math.random() * 10 ** aaa)
  console.log(result)
}
getToken(10)