


function getWelcomeTemplate({name,school,CreateAt}){
  const result = `
    <html>
        <body>
            <h1> ${name}님 가입을 환영합니다.</h1>
            <hr/>
            <div>이름: ${name} </div>
            <div>나이: ${age} </div>
            <div>학교: ${school} </div>
            <div>이름: ${CreateAt}  </div>
        </body>
    </html>
  `
  console.log(result)

}
const MYUSER = {
  name:"영희",
  age:12,
  school:"토끼초등학교",
  CreateAt:"2020-01-04"
}


getWelcomeTemplate(MYUSER)