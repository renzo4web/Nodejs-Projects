const puppeteer = require('puppeteer');
fs = require('fs');

(async function () {
  try {
    // browser instance
    console.log("LAUNCHING BROWSER.....");
    const browser = await puppeteer.launch();

    const page = await browser.newPage();
    await page.goto('https://send.cm/s/1YM/JavaScript-_The_Hard_Parts-_v2');
    await page.waitForSelector("input[name='fld_passwd']", {
      visible: true, // delay we need to wait for the input
    });
    // password Input
    console.log("TYPING PASSWORD.....");
    await page.type("input[name='fld_passwd']", '!Babiato!', {
      delay: 200,
    });
    await page.click("button[name='verifyPass']");
    // get data
    console.log("CORRECT PASSWORD....");
    
    await page.waitForSelector("div[class='container']", { visible: true });
    const linkPages = await page.$$eval("a[class='page-link']", (links) =>
    links.map((a) => a.href)
    );
    let urls = [];
    console.log("GETING THE LINKS....");
    for (let i = 0; i < linkPages.length - 1; i++) {
      await page.waitForSelector("div[class='container']", { visible: true });
       let link = await page.$$eval('tbody tr  td a', (links) =>
        links.map((a) => a.href)
      );
      urls = urls.concat(link);
      await page.click("ul[class='pagination mg-b-0'] li:last-child", {
        delay: 200,
      });
    }
    const linksToTxt =  urls.join("\n")
    console.log("ALMOST DONE 🤞");
    await fs.writeFile('./urls.txt', linksToTxt, (err) => {
      if (err) throw err;
      console.log('File successfully written to disk');
    });
  } catch (error) {
    console.error(error);
  }
})();
