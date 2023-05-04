export const checkisvaild = (myphone) =>{
    if(myphone.length !== 10 && myphone.length !== 11){
        return false
    }else{
        return true
    }
}

export const gettoken = () =>{
 const settingnum = 6
 const result = String(Math.floor(Math.random()*10 ** settingnum))
 return result
}

export const getsmstophone = (myphone,token) =>{

    console.log(myphone+"이번호로"+token+"를 전송하였습니다.")
}

