import {Checkvailddation,Sendtokentosms} from "./phone.js"
import {gettoken} from "./gettoken.js"


function CreateTokenofphone(myphone){
  const isVaild = Checkvailddation(myphone)
  if(isVaild){
    const mytoken =gettoken()
    Sendtokentosms(myphone,mytoken)
  }
}



CreateTokenofphone("01091905201",6)