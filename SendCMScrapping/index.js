const puppeteer = require('puppeteer');
const prompt = require('prompt-sync')();

fs = require('fs');

const login = async (page, url, password) => {
  await page.goto(url);
  await page.waitForSelector("input[name='fld_passwd']", {
    visible: true, // delay we need to wait for the input
  });
  if (password) {
    // password Input
    console.log('TYPING PASSWORD.....');
    await page.type("input[name='fld_passwd']", password, {
      delay: 200,
    });
    await page.click("button[name='verifyPass']");
    // get data
  }
  console.log('CORRECT PASSWORD....');
};

(async function () {
  try {
    // browser instance
    console.log('LAUNCHING BROWSER.....');
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const linkOfSendcm = prompt('Enter send.cm link: ');
    const password = prompt('Enter Password if is necessary : ');

    login(page, linkOfSendcm, password);

    const linkPages = await getRangeOfPages(page);

    let urls = [];

    console.log('GETING THE LINKS....');
    urls = await getTheLinks(linkPages, page, urls);

    const linksToTxt = urls.join('\n');

    console.log('ALMOST DONE 🤞');

    await writeLinksToTxt(linksToTxt);
  } catch (error) {
    console.error(error);
  }
})();

async function writeLinksToTxt(linksToTxt) {
  await fs.access('./urls.txt', (err) => {
    if (err) {
      write('./urls.txt');
      console.log('The file does not exist.');
    } else {
      write(`./urls${Math.random() * 20}r.txt`);
      console.log('The file exists.');
    }
  });

  const write = (name) => {
    fs.writeFile(name, linksToTxt, (err) => {
      if (err) throw err;
      console.log('File successfully written to disk');
    });
  };
}

async function getTheLinks(linkPages, page, urls) {
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
  return urls;
}

async function getRangeOfPages(page) {
  await page.waitForSelector("div[class='container']", { visible: true });
  const linkPages = await page.$$eval("a[class='page-link']", (links) =>
    links.map((a) => a.href)
  );
  return linkPages;
}
