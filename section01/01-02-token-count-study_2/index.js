// 안좋은 예
// function createTokenofPhone(aaa) {
//   // aaa: 매개변수(parameter)
//   if (aaa.length >= 10) {
//     if (aaa.length <= 11) {
//       //2. 핸드폰 토큰 6자리 만들기
//       const Token = String(Math.floor(Math.random() * 1000000)).padStart(
//         6,
//         "0"
//       );
//       //3.핸드폰번호에 토큰 전송하기
//       console.log(`${aaa}의 번호로 인증번호 ${Token}를 전송합니다. `);
//     } else {
//       console.log("에러발생 핸드폰 번호를 제대로 입력해주세요!");
//     }
//   } else {
//     console.log("에러발생 핸드폰 번호를 제대로 입력해주세요");
//   }
// }

// 좋은 예
function createTokenofPhone(aaa) {
  // aaa: 매개변수(parameter)
  if (aaa.length < 10 || aaa.length > 11) {
    console.log("에러발생 핸드폰 번호를 제대로 입력해주세요");
    return;
  }
  // 2. 핸드폰 토큰 6자리 만들기
  const Token = String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
  //3. 전송하기
  console.log(`${aaa} 번호로 인증번호 ${Token}를 전송하였습니다. `);
}

createTokenofPhone("01091905201"); //인자(argument)
