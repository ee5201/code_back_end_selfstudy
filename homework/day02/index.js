
function Dated() {
  const date = new Date()
  const yy = date.getFullYear()
  const mm = String(date.getMonth() + 1).padStart("2",0) 
  const dd = String(date.getDay()).padStart("2",0)
  const HH = date.getHours()
  const SM = date.getMinutes()
  const Ss = date.getSeconds()
  const result = (`${yy}년${mm}월${dd}일 ${HH}:${SM}:${Ss}`)
  console.log(result)


}
Dated()
