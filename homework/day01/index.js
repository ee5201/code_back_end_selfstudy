function customRegistrationNumber (number) {
  const totalnum = number.split(" ")
  console.log(totalnum[0].length)

  if(totalnum[0].length >6 || totalnum[2].length >7){
    console.log("”에러 발생!!! 개수를 제대로 입력해 주세요!!!”")
    return;
  }else if(!number.includes("-")){
    console.log("에러 발생!!! 형식이 올바르지 않습니다!!!")
  }else{
    const result = number.replace(number.slice(10),"*******")
    console.log(result)
  }
}

customRegistrationNumber("212510 - 1010101")