var DOMParser = require('xmldom').DOMParser;
const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const getUrls = require("get-urls");
const cliSelect = require('cli-select');
const chalk = require('chalk');

request("https://rss.focus.de/fol/XML/rss_folnews_eilmeldungen.xml", (error, response, html) =>{
	if(!error && response.statusCode == 200){

		const $ = cheerio.load(html, {
			xmlMode: true,
			xml: {
				normalizeWhitespace: true,
			},
		});
		const dates = $("item pubDate").text().split(" +0100");
		const links = $("item link").text().split(".html");
		let list = {};

		for(i=0; i < dates.length-1; i++){
			const date = new Date(dates[i]);
			const day = date.getDate();
			if(!list[day]){
				list[day] = [links[i]+".html"];
			}else{
				list[day].push(links[i]+".html");
			}
		}

		cliSelect({
		    values: Object.keys(list),
		    valueRenderer: (value, selected) => {
		        if (selected) {
		            return chalk.underline(value);
		        }
		
		        return value;
		    },
		}).then((response) => {
			list[response.value].forEach(link => {
				writeFileForArticle(link, response.value)
			})
		});
	}
})

function writeFileForArticle(url, promisedDay){
	request(url, (error, response, html) => {
		if(!error && response.statusCode == 200){
			const $ = cheerio.load(html);

			const date = $(".displayDate");
			const day = date.text()?.split(", ")[1]?.split(".")[0];

			const title = $(".articleIdentH1");
			const leadin = $(".leadIn");
			const text = $(".textBlock");
			if(day != promisedDay){
				return "days did not match";
			}

			const pageData = date.text()+"\n"+title.text()+"\n"+leadin.text()+"\n"+text.text();
			let fileName = date.text().split(", ")[1]+", "+date.text().split(", ")[2]+".txt";
			fileName = fileName.replace(":", "-");
			fs.writeFile(fileName, pageData, (err) => {
				if(err) return console.log(err);

				console.log("written textfile");				
			})			
		}
	})
}