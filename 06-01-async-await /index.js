import axios from "axios"

// function FetchPost2 () {
//   const result = axios.get("https://koreanjson.com/posts/1")
//   console.log(result)
// }

async function Fetchpost () {
  const result = await axios.get("https://koreanjson.com/posts/1")
  console.log(result)
}

Fetchpost()