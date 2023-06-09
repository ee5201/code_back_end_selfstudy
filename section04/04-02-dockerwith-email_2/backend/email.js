export function checkemail(myemail) {
  if (!myemail.includes("@") || !myemail.includes(".")) {
    console.log("이메일을 정확히 입려갷주세요");
    return false;
  } else {
    return true;
  }
}
