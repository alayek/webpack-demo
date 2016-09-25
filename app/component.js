//var styles = require('./main.css')

module.exports = function() {
	var element = document.createElement('h1');

	element.innerHTML = 'Hello World!';
	element.className = 'redButton';
	return element;
}