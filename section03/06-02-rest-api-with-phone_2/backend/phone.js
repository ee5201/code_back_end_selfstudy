import coolsms from "coolsms-node-sdk";
const mysms = coolsms.default;

export function CheckPhone(myphone) {
  if (myphone.length < 10 || myphone.length > 11) {
    console.log("에러발생 핸드폰 번호를 제대로 입력해주세요");
    return false;
  } else {
    return true;
  }
}
export function sendTokenSMS(myphone, Token) {
  const messageService = new mysms(
    "NCS4O6PRPFKYZ7BA",
    "IEUSZYRKVAYOD01QEPY5LNJJ62ASTKNJ"
  );
  messageService.sendOne({
    to: myphone,
    from: "01091905201",
    text: `[DIATORY] 안녕하세요?! 요청하신 인증번호는 ${Token}입니다.`,
  });
  console.log(`${myphone} 번호로 인증번호 ${Token}를 전송하였습니다. `);
}

export function getToken() {
  const Token = String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
  return Token;
}
