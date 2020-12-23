var data;

var DOMParser = require('xmldom').DOMParser;
const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const getUrls = require("get-urls");

request("https://rss.focus.de/fol/XML/rss_folnews_eilmeldungen.xml", (error, response, html) =>{
	if(!error && response.statusCode == 200){
		// let string = new DOMParser().parseFromString(html, "text/xml");
		// console.log(string);

		const $ = cheerio.load(html, {
			xmlMode: true,
			xml: {
				normalizeWhitespace: true,
			},
		});
		let fetchedLinks = 0;
		Array.from(getUrls($("item").text())).forEach(link => {
			if(link.endsWith(".html") && fetchedLinks < 10){
				writeFileForArticle(link);
				fetchedLinks++;
			}
		})
	}
})
// https://focus.de/politik/gericht-in-istanbul-journalist-can-duendar-in-tuerkei-zu-mehr-als-27-jahren-haft-verurteilt_id_12805041.html
function writeFileForArticle(url){
	request(url, (error, response, html) =>{
		if(!error && response.statusCode == 200){
			const $ = cheerio.load(html);

			const date = $(".displayDate");
			const title = $(".articleIdentH1");
			const leadin = $(".leadIn");
			const text = $(".textBlock");

			const pageData = date.text()+"\n"+title.text()+"\n"+leadin.text()+"\n"+text.text();
			let fileName = date.text().split(", ")[1]+", "+date.text().split(", ")[2]+".txt";
			fileName = fileName.replace(":", "-");
			fs.writeFile(fileName, pageData, (err) => {
				if(err) return console.log(err);
				console.log("written textfile");
			})
			console.log(fileName);

		}
	})
}