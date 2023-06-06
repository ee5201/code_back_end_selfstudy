function getWelcomeTemplate({ Class }) {
  const Templete = `
    <html>
      <body>
          <h1>
            ${Class.name}님 가입을 환영합니다. 
          </h1>
          </hr>
          <div>이름: ${Class.name}</div>
          <div>나이: ${Class.age}</div>
          <div>유치원: ${Class.school}</div>
          <div>날짜:${Class.Date}</div>
      </body>
    </html>
  `;
  console.log(Templete);
}
const Class = {
  name: "맹구",
  age: 7,
  school: "떡잎마을유치원",
  Date: "2023-06-06",
};

getWelcomeTemplate({ Class });
