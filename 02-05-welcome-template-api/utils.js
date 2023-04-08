export function getToday () {
  const aaa = new Date()
  const yy = aaa.getFullYear()
  const mm = aaa.getMonth() +1
  const dd = aaa.getDay()
  const today= `${yy}-${mm}-${dd}`
  return today
}