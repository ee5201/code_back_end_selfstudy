console.log ("안녕하세요")

function gettoken() {
  const myphone = 6
  const result = String(Math.floor(Math.random()*10 ** myphone))
  console.log(result)
}

gettoken()