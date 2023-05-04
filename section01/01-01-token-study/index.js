function getToken(aaa) {
  console.log(aaa)
  const result = String(Math.floor(Math.random()*10 ** aaa)).padStart(aaa,'0')
  console.log('인증번호는 ', result, '입니다')
  
}

getToken("6")