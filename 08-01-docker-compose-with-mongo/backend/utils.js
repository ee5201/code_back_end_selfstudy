export function getToday () {
  const aaa = new Date()
  const year = aaa.getFullYear()
  const month = aaa.getMonth() +1
  const date = aaa.getDate()
  const today =`${year}-${month}-${date}`
  return today
}