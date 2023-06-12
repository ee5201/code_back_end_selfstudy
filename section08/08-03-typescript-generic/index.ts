// 1.  문자/숫자/불린/ 기본타입
const getPrimitive = (arg1: String, arg2: Number, arg3: Boolean) => {};

const result2 = getPrimitive("철수", 123, true);

const qqq = <t1, t2, t3>(arg1: t1, arg2: t2, arg3: t3) => {
  return [arg1, arg2, arg3];
};

const result = qqq("철수", false, 12);
console.log(result);
