// 타입 추론  할 수 있다.  ts

let aaa = "안녕라세요"
aaa = 3 


// 타입 명시
let bbb : string = "반갑습니다."
bbb = 10

// 타입 명시 필요한 상황
let ccc: string | number = "반갑습니다."
ccc = 10

// 숫자타입
let ddd: number = 10
ddd = "철수"

//불린타입 
let eee: boolean = true
eee = false
eee = "false"

// 배열 타입 
let fff : number [] = [1,2,3,4,5,"안녕하세요"]
let ggg: string[] = ["철수","영희","훈이"]
let hhh:(string | number)[] =  [1,2,3,4,5,"안녕하세요"]

//객체타입 
interface IProfile{
  name:string,
  age:number | string,
  school: string
  hobby?: string
}
let profile:IProfile = {
  name:"철수",
  age: 8,
  school:"다람쥐 초등학교"
}

profile.age = "8살"
profile.hobby = "수영"

//함수타입
const add = (mondey1:number ,mondey2:number ,unit: string): string =>{
  return mondey1 + mondey2 + unit

}
const result = add(1000,2000,"원")