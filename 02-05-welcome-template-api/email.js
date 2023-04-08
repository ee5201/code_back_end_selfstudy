import { getToday } from "./utils.js"

export function CheckvaildationEmail (user){
if(user.email == undefined || !user.email.includes("@") ){
  return false
}else{
  return true
}
}

export function getwelcomeTemplate (user){
  const result = `
    <html>
        <body>
            <h1> ${user.name}님 가입을 환영합니다.</h1>
            <hr/>
            <div>이름: ${user.name} </div>
            <div>나이: ${user.age} </div>
            <div>학교: ${user.school} </div>
            <div>이름: ${getToday()} </div>
        </body>
    </html>
  `
  console.log(result)
}

export function sendwelcomTemplateToemail (user,temp) {
  console.log(`${user.email} 이메일로 ${temp} 를전송합니다.`)
}