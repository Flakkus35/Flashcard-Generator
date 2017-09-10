var ClozeCard = function(text, cloze) {
	this.fullText = text;
	this.answer = cloze;
	this.partial = '';
}

ClozeCard.prototype.clozeDelete = function() {
	// Replaces cloze answer with ...
	this.partial = this.fullText.replace(this.answer, '...');
}

module.exports = ClozeCard;