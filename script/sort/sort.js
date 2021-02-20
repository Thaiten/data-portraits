// import spiegel from "./spiegel.json"
// import focus from "./focus.json"
// import dw from "./dw.json"
const fs = require("fs");

const spiegel = require("./spiegel.json").corpusTerms.terms
const focus = require("./focus.json").corpusTerms.terms
const dw = require("./dw.json").corpusTerms.terms

var collectedData = {};

for (let i = 0; i < spiegel.length; i++) {
	const element = spiegel[i];

	if(element.term){
		// console.log(`Term: ${element.term}; Frequency: ${element.rawFreq}`)
		// collectedData[element.term].spiegel = element.rawFreq
		collectedData[element.term] = {...{spiegel: element.rawFreq}}
	}
	
}

for (let i = 0; i < focus.length; i++) {
	const element = focus[i];
	
	if(element.term){
		// console.log(`Term: ${element.term}; Frequency: ${element.rawFreq}`)

		// collectedData[element.term].focus = element.rawFreq
		collectedData[element.term] = {...collectedData[element.term], ...{focus: element.rawFreq}}

	}
}

for (let i = 0; i < dw.length; i++) {
	const element = dw[i];
	
	if(element.term){
		// console.log(`Term: ${element.term}; Frequency: ${element.rawFreq}`)

		collectedData[element.term] = {...collectedData[element.term], ...{dw: element.rawFreq}}
		// collectedData[element.term].dw = element.rawFreq
	}
}

// console.log(collectedData)

var filteredData = {}

for(const[key, value] of Object.entries(collectedData)){
	// console.log(`${key}: ${value}`);
	// console.log(value)
	if(Object.keys(value).length > 1){
		// console.log(key, value)
		filteredData[key] = value;
	}
}

// console.log(filteredData)
fs.writeFile("filtered-headlines.json", JSON.stringify(filteredData), (err) => {
	if(err) return console.log(err);

	console.log("written textfile");				
})	