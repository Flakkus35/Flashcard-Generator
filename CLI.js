var BasicCard = require("./BasicCard.js");
var ClozeCard = require("./ClozeCard.js");
var inquirer = require("inquirer");
var fs = require("fs");

var param1 = process.argv[2];

if (param1 == "basic" || param1 == "cloze") {
	inquirer.prompt([
		{
			name: "question",
			type: "input",
			message: "Create a new question"
		},
		{
			name: "answer",
			type: "input",
			message: "Create a new answer"
		}
	]).then(function(input) {
		if (param1 == "basic") {
			var newQuestion = new BasicCard(input.question, input.answer);
			console.log(newQuestion.front);
			console.log(newQuestion.back);
			fs.appendFile("flashlog.txt", newQuestion.front + ', ' + newQuestion.back, function(err) {
				if (err) {
					return console.log(err);
				} 
			});
		} else if (param1 == "cloze") {

		}
	});
} else {
	console.log(param1 + " is not a valid command");
}