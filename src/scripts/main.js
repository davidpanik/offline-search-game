'use strict';

import createPhoneBook from './phonebook';
import random from './random';
import View from './view';

const numberOfNames = 30 * 1000;

let results = createPhoneBook(numberOfNames);

console.log(results);

let target = random(results);

console.log(target);

let testView = new View('bob', target, function() {
	return `Number: ${this.data.number}`;
});

setTimeout(() => {
	let newTarget = random(results);	
	// testView.data.number = 123;
	// testView.render();
	testView.data = newTarget;
	console.log(testView.data);
	console.log(testView.data.number);
}, 3000);
