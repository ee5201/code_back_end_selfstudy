export function gettoken() {
  const token = 6;
  const result = String(Math.floor(Math.random()*10 ** token)).padStart(6,"0")
  return result
}