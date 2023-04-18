
function getTemplete (aaa) {
  const result = `
  <html>
      <body>
          <h1> ${aaa.name}님 가입을 환영합니다.</h1>
          <hr/>
          <div>이름: ${aaa.name} </div>
          <div>나이: ${aaa.age} </div>
          <div>학교: ${aaa.school} </div>
          <div>날짜:${aaa.Date}  </div>
      </body>
  </html>
`
console.log(result)
}

const Class = {
  name : "영희",
  age : 12,
  school : "토끼초등학교",
  Date : "2020-01-03",
}

getTemplete(Class)