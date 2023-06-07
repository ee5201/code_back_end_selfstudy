export function CheckPhone(myphone) {
  if (myphone.length < 10 || myphone.length > 11) {
    console.log("에러발생 핸드폰 번호를 제대로 입력해주세요");
    return false;
  } else {
    return true;
  }
}
export function sendTokenSMS(myphone, Token) {
  console.log(`${myphone} 번호로 인증번호 ${Token}를 전송하였습니다. `);
}

export function getToken() {
  const Token = String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
  return Token;
}
