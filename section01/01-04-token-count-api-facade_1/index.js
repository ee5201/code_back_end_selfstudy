import { CheckIsvaild, gettoken,getmessagetophone } from "./phone.js"

function CreatePhoneToken (myphone) {
    const isvaild = CheckIsvaild(myphone)

    if(isvaild){
        const token = gettoken(myphone)
        getmessagetophone(myphone,token)
    }
}


CreatePhoneToken("01091905201")