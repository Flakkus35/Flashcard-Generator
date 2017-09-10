var BasicCard = require("./BasicCard.js");
var ClozeCard = require("./ClozeCard.js");
var inquirer = require("inquirer");
var fs = require("fs");

var param1 = process.argv[2];

if (param1 == "basic") {
	inquirer.prompt([
		{
			name: "question",
			type: "input",
			message: "Create a new question:"
		},
		{
			name: "answer",
			type: "input",
			message: "Create a new answer:"
		}
	]).then(function(input) {
		var newQuestion = new BasicCard(input.question, input.answer);
		console.log("Question: " + newQuestion.front);
		console.log("Answer: " + newQuestion.back);
		fs.appendFile("flashlog.txt", newQuestion.front + ', ' + newQuestion.back + ',', function(err) {
			if (err) {
				return console.log(err);
			} 
		});
	});
} else if (param1 == 'cloze') {
	inquirer.prompt([
		{
			name: "fullQuestion",
			type: "input",
			message: "Write cloze statement:"
		},
		{
			name: "clozeAnswer",
			type: "input",
			message: "Write cloze answer:"
		}
	]).then(function(input) {
		var newClozeQuestion = new ClozeCard(input.fullQuestion, input.clozeAnswer);
		newClozeQuestion.clozeDelete();
		if (input.fullQuestion == newClozeQuestion.partial) {
			return console.log(input.clozeAnswer + ' is not part of the question');
		}
		console.log('Question: ' + newClozeQuestion.partial);
		console.log('Answer: ' + newClozeQuestion.answer);
		fs.appendFile("flashlog.txt", newClozeQuestion.partial + ', ' + newClozeQuestion.answer + ',', function(err) {
			if (err) {
				return console.log(err);
			}
		})
	})
} else if (param1 == 'run') {
	fs.readFile('flashlog.txt', 'utf8', function(err, data) {
		if (err) {
			return console.log(err);
		}
		var dataArr = data.split(',');
		// console.log(dataArr);
		var count = 0;
		var askQuestion = function() {
			if (count < dataArr.length - 2) {
				inquirer.prompt([
					{
						name: 'question',
						type: 'input',
						message: dataArr[count]
					}
				]).then(function(input) {
					console.log('Answer = ' + dataArr[count + 1]);
					count+=2;
					askQuestion();
				});
			}
			
		}
		askQuestion();
	});
} 
else {
	console.log(param1 + " is not a valid command");
}

