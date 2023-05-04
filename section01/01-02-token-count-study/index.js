function getToken(aaa){
  if(aaa === undefined){
    console.log("에러발생!! , 입력을 해주시길 바랍니다.")
    return;
  }else if(aaa <=0){
    console.log("에러발생!! , 입력한 값이 너무 작습니다.")
    return;
  }else if(aaa >10){
    console.log('에러발생!! 갯수가 너무 많습니다.')
    return;
  }
  const result = String(Math.floor(Math.random()*10 ** 6)).padStart(6,"0")
  console.log(result)
}

getToken(10)