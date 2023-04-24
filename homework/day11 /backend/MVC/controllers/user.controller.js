import { CheckValidationEmail, getWelcomeTemplate, sendWelcomeTemplateToEmail } from "./service/email.js";

export class User {
  user = (req,res)=>{
    const user =req.body.myuser
      // 1. 이메일이 정상인지 확인(1-존재여부, 2-"@"포함여부)
      const isValid = CheckValidationEmail(user.email);
      if (isValid) {
        // 2. 가입환영 템플릿 만들기
        const template = getWelcomeTemplate(user);
    
        // 3. 이메일에 가입환영 템플릿 전송하기
        sendWelcomeTemplateToEmail(user.email, template);
        res.send("가입완료!!!")
      }
  }
}