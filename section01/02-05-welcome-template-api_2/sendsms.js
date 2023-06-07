import { Dates } from "./date.js";

export function Templete(myUser) {
  const result = `
  <html>
  <body>
      <h1>
        ${myUser.name}님 가입을 환영합니다. 
      </h1>
      </hr>
      <div>이름: ${myUser.name}</div>
      <div>나이: ${myUser.age}</div>
      <div>유치원: ${myUser.school}</div>
      <div>날짜:${Dates()}</div>
  </body>
</html>
  `;
  return result;
}
