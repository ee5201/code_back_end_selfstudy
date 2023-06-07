import { checkemail } from "./Phone.js";
import { SendEmail } from "./Token.js";
import { Templete } from "./sendsms.js";

function createrUser(myuser) {
  const isVaild = checkemail(myuser.email);
  if (isVaild) {
    const myTemplete = Templete(myUser);
    SendEmail(myTemplete, myuser);
  }
}

const myUser = {
  name: "철수",
  age: 13,
  school: "다람쥐초등학교",
  email: "a@a.com",
};
createrUser(myUser);
