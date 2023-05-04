


function getWelcomeTemplate(name,age,school,date){
  const result = `
    <html>
        <body>
            <h1> ${name}님 가입을 환영합니다.</h1>
            <hr/>
            <div>이름: ${name} </div>
            <div>나이: ${age} </div>
            <div>학교: ${school} </div>
            <div>이름: ${date}  </div>
        </body>
    </html>
  `
  console.log(result)

}
const myname = "영희"
const myage = 12
const myschool = "토끼초등학교"
const CreatedAt = "2020-01-03"

getWelcomeTemplate(myname,myage,myschool,CreatedAt)
