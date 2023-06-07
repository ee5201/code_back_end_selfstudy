export function Dates() {
  const date = new Date();
  const yy = date.getFullYear();
  const mm = Number(date.getMonth() + 1);
  const dd = date.getDay();
  const result = `${yy}년${mm}월${dd}일`;
  return result;
}
