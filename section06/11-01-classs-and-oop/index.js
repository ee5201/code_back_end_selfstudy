const aaa = new Date()
console.log(aaa.getFullYear())
console.log(aaa.getMonth()+1)

class Monster {
  power = 10 
  
  constructor(aaa) {
    this.power = aaa
  } //생성자 초기화 함수

  attack = () =>{

    console.log("공격하자 ")
    console.log("내공격력은" + this.power+ "이야")
  }

  run = () =>{
    console.log('도망가자!!')
  }

}

const mymonster1 = new Monster(20)
mymonster1.attack()
mymonster1.run()
const mymonster2 = new Monster(50)
mymonster2.attack()
mymonster2.run()

