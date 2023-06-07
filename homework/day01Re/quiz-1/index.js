//주민 번호 만들기
const vaildPin = (pin) => {
  if (pin.includes("-")) {
    return true;
  } else {
    console.log("에러발생!!! 형식이 올바르지 않습니다.");
    return false;
  }
};

const checkpin = (pin) => {
  const num = pin.split("-");
  if (num[0].length === 6 && num[1].length === 7) {
    const maskedNum = num[0] + "-" + num[1].replace(num[1].slice(-6), "******");
    console.log(maskedNum);
  } else {
    console.log("주민번호가 잘못되었습니다. 재확인 부탁드립니다.");
    return;
  }
};

function customRegistrationNumber(pin) {
  // 1. 주민번호 가운데가 ”-”로 구성되어야 합니다.
  const isvaild = vaildPin(pin);
  // 2. 주민번호는 앞 6자리, 뒤 7자리로 구성되어야 합니다.
  // 3. 뒤 7자리 중, 끝 6자리는 *로 변경해서 콘솔에 출력해 주세요.
  if (isvaild) checkpin(pin);

  // 4. 함수는 퍼사드 패턴이 적용되어야 합니다.
  //     - 필요시 새로운 파일도 생성 가능합니다. - 파일명 자유
  // 5. 함수에 “210510-1010101”, “210510-1010101010101”, “2105101010101”를 각각 넣어 실행했을 때 아래의 출력 결과 예시와 동일하게 나타나면 됩니다.
}

const pin = "210510-1010101";

customRegistrationNumber("210510-1010101");
customRegistrationNumber("210510-1010101010101");
customRegistrationNumber("2105101010101");
