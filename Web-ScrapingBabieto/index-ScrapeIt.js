// const cheerio = require("cheerio")
// const request = require("request")
// const requestPromise = require("request-promise")
// const scrapeIt = require('scrape-it');
//
// // obj
// let resultObject = {};
//
// // Function
// (async () => {
//   try {
//     await scrapeIt('https://send.cm/s/1YM/JavaScript-_The_Hard_Parts-_v2', {
//       presentations: {
//         listItem: 'tbody tr  td a',
//         data: {
//           links: 'a',
//         },
//       },
//     }).then(({ data, response }) => {
//       console.log(`Status Code: ${response.statusCode}`);
//       resultObject = data;
//       resultObject.presentations.forEach((link) => {
//         console.log(link.href);
//       });
//     });
//   } catch (error) {
//     console.log(error);
//   }
// })();
