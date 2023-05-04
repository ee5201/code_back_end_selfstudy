import puppeteer from 'puppeteer'

async function startCrawling() {
  const browser = await puppeteer.launch({headless:true}) //브라우저 시작하기 headless: true 하면 우리 눈에 보인다.
  const page = await browser.newPage()
  await page.setViewport({width:1280,height:720}) //사이트 크기 조정 
  await page.goto(`https://www.goodchoice.kr/product/search/2`)
  await new Promise((page) => setTimeout(page, 1000));

  const stage =  await page.$eval("#poduct_list_area > li:nth-child(2) > a > div > div.name > div > span",(el)=>(el.textContent))
  
  const location = await page.$eval("#poduct_list_area > li:nth-child(2) > a > div > div.name > p:nth-child(4)",(el)=>(el.textContent))

  const price = await page.$eval("#poduct_list_area > li:nth-child(2) > a > div > div.price > p > b",(el)=>(el.textContent))

  console.log(stage)
  console.log(location)
  console.log(price)



}
startCrawling()