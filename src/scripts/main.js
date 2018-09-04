/* TODO
	Go beyond document.getElementById()
*/

'use strict';

import createPhoneBook from './phonebook';
import random from './random';
import Store from './store';
import Events from './events';
import Clicks from './clicks';
import View from './view';

let store = new Store();
let events = new Events();
let clicks = new Clicks(events);

const numberOfNames = 30 * 1000;

store.phoneBook = createPhoneBook(numberOfNames);
store.target = random(store.phoneBook);
store.screen = 'intro';

console.log(store.target);

let testView = new View('bob', store.target, function() {
	return `Number: ${this.data.number}`;
});

setTimeout(() => {
	let newTarget = random(store.phoneBook);	
	// testView.data.number = 123;
	// testView.render();
	testView.data = newTarget;
	console.log(testView.data);
	console.log(testView.data.number);
}, 3000);

let screenView = new View('screen', store.screen, function() {
	switch(this.data) {
		case 'intro':
			return `
				<p>You kids don't know you're born.</p>
				<p>When I was your age we didn't have no Google or autocomplete.</p>
				<p>If we wanted to find something out we either had to ask someone who knew, or find a book then find it in the book.</p>
				<p>To help educate you how lucky you all are, here's a little game called "finding someone's phone number in the phone book".</p>
				<p>It's easy - I tell you someone's name, you have to find out their phone number for me. As quickly as possible.</p>
				<p>Ready? No? Tough.</p>

				<button on-click="intro-begin">Let's begin.</button>
			`;
			break;
		case 'game':
			return `This is the game`;
			break;
		default:
			return `Nothing here`;
			break;
	}
});

clicks.on('intro-begin', () => { screenView.data = 'game'; });

