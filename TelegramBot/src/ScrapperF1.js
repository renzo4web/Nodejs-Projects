const cheerio = require('cheerio');
const request = require('request-promise');

class ScrapperF1 {
    constructor() {
    }

    async getLinksUrls() {
        const urlRaces = 'https://carrerasf120.blogspot.com/';
        let links = [];
        const $ = await request({
            uri: urlRaces,
            transform: (body) => cheerio.load(body),
        });

        $('h3.post-title.entry-title > a').each((i, el) => {
            const link = {
                title: $(el).text().trim(),
                url: $(el).attr('href')
            };
            links = [...links, link];
        });
        return links;
    }

    async searchRace(race) {

        let links = [];
        const $ = await request({
            uri: race.url,
            transform: (body) => cheerio.load(body),
        });

        $('a').each((i, el) => {
            const regex = /Mega|MEGA/;
            if (regex.test($(el).text())) {

                let textLink = $(el).text().trim().split(' ').filter(word => word.match(/1080p|720p/)).join('') ;
                let directLink = $(el).attr('href');

                const isQualy = directLink.match(/Q/i);

                const link = `${isQualy ? ('Qualification') : ('Race ' + textLink)}\n${directLink} \n`;
                links = [...links, link];
            }
        });


        return {
            title: race.title,
            url: links.join('')
        };
    }


    async scrape() {
        try {
            const links = await this.getLinksUrls();
            const result = await Promise.all(links.map(link => this.searchRace(link)));
            console.log(result);
            return result;
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = ScrapperF1;
