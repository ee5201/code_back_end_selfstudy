export function Checkvaild (email) { 

    if(!email.includes("@") && !email.includes(".com")){
      console.log("이메일을 제대로 입력해주세요")
      return false
    }else{
      return true
    }
}

export function getTemplet (user) {
  const result = `
    <html>
        <body>
            <h1> ${user.name}님 가입을 환영합니다.</h1>
            <hr/>
            <div>이름: ${user.name} </div>
            <div>나이: ${user.age} </div>
            <div>학교: ${user.school} </div>
        </body>
    </html>
  `
  console.log(result)
}

export function sedemail (email,temp) {
  console.log(`${email}로 ${temp}전송하였습니다.`)
}