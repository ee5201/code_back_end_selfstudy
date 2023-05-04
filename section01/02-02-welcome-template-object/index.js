


function getWelcomeTemplate(user){
  const result = `
    <html>
        <body>
            <h1> ${user?.name}님 가입을 환영합니다.</h1>
            <hr/>
            <div>이름: ${user?.name} </div>
            <div>나이: ${user?.age} </div>
            <div>학교: ${user?.school} </div>
            <div>이름: ${user?.CreateAt}  </div>
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
// const myname = "영희"
// const myage = 12
// const myschool = "토끼초등학교"
// const CreatedAt = "2020-01-03"

getWelcomeTemplate(MYUSER)