import { Checkvaild, getTemplet, sedemail } from "./email.js";

function createrUser (myuser) {
  const isVaild = Checkvaild(myuser.email)
  if(isVaild){
    const templet = getTemplet(myuser)

    sedemail(myuser.email,templet)
  }
}

const myUser = {
  name: '철수',
  age: 13,
  school: '다람쥐초등학교',
  email: 'a@a.com',
};
createrUser(myUser)
