function PrintTIme() {
  const Time = () => {
    const date = new Date();
    const yy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDay()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");
    const seco = String(date.getSeconds()).padStart(2, "0");
    const result = `${yy}년${mm}월${dd}일 ${hours}:${min}:${seco}입니다.`;
    console.log(result);
  };
  setInterval(Time, 1000);
}
PrintTIme();
