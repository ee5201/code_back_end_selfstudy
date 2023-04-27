class Mycar {
  model = " "
  mar = ""
  color = ""
  constructor  (aaa,bbb,ccc) {
    this.model = aaa
    this.mar = bbb
    this.color = ccc
    console.log(aaa)
    console.log(bbb)
    console.log(ccc)

  }
  start = () =>{
  console.log("출발하기")
}

  stop = () =>{
  console.log("정지하기")
}
}




const Myfirstcar = new Mycar('기종: 재규어',"마력: 300마력","색상: 블랙")
Myfirstcar.model
Myfirstcar.start()
Myfirstcar.stop()





// color = () =>{
//   console.log("black")
// }
// mar = () =>{
//   console.log("300마력")
// }
// model = () =>{
//   console.log("재규어")
// }