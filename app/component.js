//var styles = require('./main.css')

module.exports = function() {
	var element = document.createElement('button');

	element.innerHTML = 'Hello World!';
	element.className = 'redButton';
	element.className = 'pure-button';
	return element;
}