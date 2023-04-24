

class Monster {
  power = 10 
  constructor(aaa) {
    this.power = aaa
  } //생성자 초기화 함수
  

  attack = () =>{
    

    console.log("공격하자 ")
    console.log("내공격력은" + this.power+ "이야")
  }
  
}

class SkyMonster extends Monster{
 

  run = () =>{
    console.log('날라서 도망가자!!')
  }

} 
class GroundMonster extends Monster{
  
  run = () =>{
    console.log('뛰어서 도망가자!!')
  }

}


const mymonster1 = new SkyMonster(10)
mymonster1.attack()
mymonster1.run()
const mymonster2 = new GroundMonster(20)
mymonster2.attack()
mymonster2.run()


