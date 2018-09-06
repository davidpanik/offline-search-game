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

const numberOfNames = 30 * 1000;
const namesPerPage = 200;

let store = new Store();
let events = new Events();
let clicks = new Clicks(events);

let appView = new View('app', store, function() {
	switch (this.data.screen) {
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
	case 'game':
		return `
			<p>Please find the phone number for ${this.data.target.title} ${this.data.target.initial} ${this.data.target.surname}</p>
			<p><input type="text" id="game-input"><button on-click="game-submit">Submit</button></p>

			<button on-click="game-begin">Get out phonebook</button>
		`;
	case 'book':
		let intervals = 20;

		let links = '';

		for (let x = 1; x < intervals; x++) {
			let point = Math.round((x / intervals) * 100);
			let page = Math.round(point * appView.data.phoneBook.length);

			links += `<li><button on-click="book-open" on-click-data="${page}">Jump in here ${point}%</button></li>`;
		}

		return `
			<ul>
				${links}
			</ul>

			<button on-click="book-back">Put away phonebook</button>
		`;
	case 'page':
		return `
			<button on-click="page-back-few">Back a few pages</button>
			<button on-click="page-back-one">Back one page</button>
			<ul>
				<li>Name number</li>
			</ul>
			<button on-click="page-forward-one">Forward one page</button>
			<button on-click="page-forward-few">Forward a few pages</button>

			<button on-click="page-back">Close phonebook</button>
		`;
	default:
		return `
			Nothing here
		`;
	}
});

clicks
	.on('intro-begin', () => { newGame(); })
	.on('game-begin', () => { appView.update({ screen: 'book' }); })
	.on('game-submit', () => { checkAnswer(); })
	.on('book-open', (page) => { console.log(page); })
	.on('book-back', () => { appView.update({ screen: 'game' }); })
	.on('page-back', () => { appView.update({ screen: 'game' }); });

function newGame() {
	appView.data.phoneBook = createPhoneBook(numberOfNames);
	appView.data.target = random(appView.data.phoneBook);
	console.log(appView.data.target);
	appView.update({ screen: 'game' });
}

function checkAnswer() {
	if (document.getElementById('game-input').value.replace('-', '') === appView.data.target.number.replace('-', '')) {
		alert('That is correct!');
	} else {
		alert('Sorry that is wrong');
	}
}

appView.update({ screen: 'intro' });
