// const cheerio = require("cheerio")
// const request = require("request")
// const requestPromise = require("request-promise")
const scrapeIt = require("scrape-it")

// obj
let resultObject = {};

// Function
(async () => {
    try {
         await scrapeIt("https://store.steampowered.com/?l=spanish", {
            presentations: {
                listItem: '#tab_topsellers_content>a',
                data: {
                    title: "a .tab_item_content  .tab_item_name"
                    ,
                    desc: "a .tab_item_content .tab_item_details .tab_item_top_tags span"
                    ,
                    price: "a .discount_block.tab_item_discount .discount_prices .discount_final_price",
                }
            }
        }).then(({data, response}) => {
            console.log(`Status Code: ${response.statusCode}`)
            resultObject = data
            resultObject.presentations.forEach(game=>{
                console.log("--------------")
                console.log(game.title);
                console.log(game.desc);
                console.log(game.price);
                console.log("--------------")
            })
        })

    } catch (error) {
        console.log(error);
    }
})()

