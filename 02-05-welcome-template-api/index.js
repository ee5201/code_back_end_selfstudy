import { CheckvaildationEmail, getwelcomeTemplate, sendwelcomTemplateToemail } from "./email.js";

function createUser (user) {

  const isVaild = CheckvaildationEmail(user)

  if(isVaild){
    const template = getwelcomeTemplate(user)

    sendwelcomTemplateToemail(user,template)
  }

}

const myUser = {
  name: '철수',
  age: 13,
  school: '다람쥐초등학교',
  email: 'a@a.com',
};

createUser(myUser)