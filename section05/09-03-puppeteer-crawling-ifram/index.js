import puppeteer from 'puppeteer'

async function startCrawling() {
  const browser = await puppeteer.launch({headless:true}) //브라우저 시작하기 headless: true 하면 우리 눈에 보인다.
  const page = await browser.newPage()
  await page.setViewport({width:1280,height:720}) //사이트 크기 조정 
  await page.goto(`https://finance.naver.com/item/sise.naver?code=005930`)
  await new Promise((page) => setTimeout(page, 1000));
  const frampage = await page.frames().find((el)=>(el.url().includes("/item/sise_day.naver?code=005930")))
  for(let i=3; i<=7; i++){
    const date = await frampage.$eval(`body > table.type2 > tbody > tr:nth-child(${i}) > td:nth-child(1) > span`,(el)=> el.textContent)

    const price = await frampage.$eval(`body > table.type2 > tbody > tr:nth-child(${i}) > td:nth-child(2) > span`,(el)=> el.textContent)
    console.log(`날짜: ${date},가격: ${price}`)


  }

 

  


  await browser.close()
}
startCrawling()