import { Dates } from "./date.js";

export function Templete({ name, age, school }) {
  const result = `
  <html>
  <body>
      <h1>
        ${name}님 가입을 환영합니다. 
      </h1>
      </hr>
      <div>이름: ${name}</div>
      <div>나이: ${age}</div>
      <div>유치원: ${school}</div>
      <div>날짜:${Dates()}</div>
  </body>
</html>
  `;
  return result;
}
