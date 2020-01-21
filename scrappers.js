const puppeteer = require('puppeteer');
const path = 'https://www.amazon.com/s?k=black+swan&i=stripbooks-intl-ship&crid=M04P4B481XNK&sprefix=Black%2Caps%2C480&ref=nb_sb_ss_i_1_5'

const scrapeProduct = async (url)=>{

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const [ el ] = await page.$x('//*[@id="search"]/div[1]/div[2]/div/span[4]/div[1]/div[1]/div/span/div/div/div[2]/div[1]/div/div/span/a/div/img')
    const src = await el.getProperty('src');
    const imgUrl = await src.jsonValue();

    const [ el2 ] = await page.$x('//*[@id="search"]/div[1]/div[2]/div/span[4]/div[1]/div[1]/div/span/div/div/div[2]/div[2]/div/div[1]/div/div/div[1]/h2/a/span')
    const txt = await el2.getProperty('textContent');
    const Title = await txt.jsonValue();

    const [ el3 ] = await page.$x('//*[@id="search"]/div[1]/div[2]/div/span[4]/div[1]/div[1]/div/span/div/div/div[2]/div[2]/div/div[2]/div[1]/div/div[1]/div[2]/div/a/span[1]/span[1]')
    const txtPrice = await el3.getProperty('textContent');
    const Price = await txtPrice.jsonValue();

    

    console.log({imgUrl, Title, Price});

    browser.close();
}

scrapeProduct(path);