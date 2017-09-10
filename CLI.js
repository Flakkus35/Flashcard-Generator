// Grab all necessary packages and files
var BasicCard = require("./BasicCard.js");
var ClozeCard = require("./ClozeCard.js");
var inquirer = require("inquirer");
var fs = require("fs");

// Store first command line argument
var param1 = process.argv[2];

// Determines which process to run 
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
		// Creates new basic flashcard
		var newQuestion = new BasicCard(input.question, input.answer);
		console.log("Question: " + newQuestion.front);
		console.log("Answer: " + newQuestion.back);
		// Writes flashcard to text file
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
		// Creates new cloze flashcard
		var newClozeQuestion = new ClozeCard(input.fullQuestion, input.clozeAnswer);
		// Removes cloze answer from full question
		newClozeQuestion.clozeDelete();
		// Returns error if cloze answer is not part of full question
		if (input.fullQuestion == newClozeQuestion.partial) {
			return console.log(input.clozeAnswer + ' is not part of the question');
		}
		console.log('Full Question: ' + newClozeQuestion.fullText);
		console.log('Cloze Question: ' + newClozeQuestion.partial);
		console.log('Cloze Answer: ' + newClozeQuestion.answer);
		// Writes new cloze flashcard to text file
		fs.appendFile("flashlog.txt", newClozeQuestion.partial + ', ' + newClozeQuestion.answer + ',', function(err) {
			if (err) {
				return console.log(err);
			}
		})
	})
} else if (param1 == 'run') {
	// Grabs data from text file
	fs.readFile('flashlog.txt', 'utf8', function(err, data) {
		if (err) {
			return console.log(err);
		}
		var dataArr = data.split(',');
		var count = 0;
		var askQuestion = function() {
			// Runs prompt until there are no more questions
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
		// Initialize flashcard prompts
		askQuestion();
	});
} 
else {
	// Returns error is command argument is not valid
	console.log(param1 + " is not a valid command");
}

