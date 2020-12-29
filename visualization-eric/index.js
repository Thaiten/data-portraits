const fs = require('fs')
const wordCount = require("./word-count-full.json")

const filteredList = [];
wordCount.corpusTerms.terms.forEach((term) => {
	if(term.rawFreq > 9){
		filteredList.push(term);
	}
});

try {
	fs.writeFileSync("./filteredList.json", JSON.stringify(filteredList))
} catch (err) {
	console.error(err)
}

