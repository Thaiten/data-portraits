const fs = require("fs")
const readline = require("readline")
fs.WriteStream.setMaxListeners(999);
var currentFile = "";

function processFile(file){
	console.log(file)
	let finalLine;
	let readInterface = readline.createInterface({
		input: fs.createReadStream(file),
		output: process.stdout,
		console: false
	})
	readInterface.on('line', function(line) {
		console.log(line);
		finalLine = line
		readInterface.close();
	})
	readInterface.on('close', function() {
		process.exit(0);
		return finalLine;
	})
}

var wantedLines = []

fs.readdir("./", (err, files) => {
	files.forEach(file => {
		processFile(file)
		

	})
})
console.log(wantedLines)