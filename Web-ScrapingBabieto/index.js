const puppeteer = require('puppeteer');
const prompt = require('prompt-sync')();
const scrapeIt = require('scrape-it');

fs = require('fs');

(async function () {
    try {
        // browser instance
        console.log('LAUNCHING BROWSER.....');
        const browser = await puppeteer.launch({headless: true});
        const page = await browser.newPage();
        await page.goto('https://babiato.co/threads/%F0%9F%94%A5%F0%9F%94%A5-super-huge-course-collection-700-courses-3tb-data-%F0%9F%94%A5%F0%9F%94%A5.40041/');
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

async function getTheLinks(linkPages) {
    let allCodes = [];
    for await (let link of linkPages) {
        try {
            await scrapeIt(link, {
                presentations: {
                    listItem: '.bbTable tr',
                    data: {
                        name: 'tr td:nth-child(1)',
                        code: 'tr td:nth-child(2)',
                        site: 'tr td:nth-child(3)',
                    },
                },
            }).then(({data, response}) => {
                console.log(`Page ${linkPages.indexOf(link) + 1}  Status Code: ${response.statusCode} ✔`);
                allCodes.push(data.presentations);
            });
        } catch (error) {
            console.log(error);
        }

    }

    return allCodes.flat()
                   .map(({name, code, site}) => {
                       return [`|Name : ${name}|`, ` |Code: ${code}| `, ` |Site: ${site}| `];
                   });
}

async function getRangeOfPages(page) {
    await page.waitForSelector("ul[class='pageNav-main']", {visible: true});
    const linkPages = await page.$$eval("ul[class='pageNav-main'] li a", (links) =>
        links.map((a) => a.href)
    );
    //remove duplicates
    const set = new Set(linkPages);
    return [...set];
    // return linkPages;
}
