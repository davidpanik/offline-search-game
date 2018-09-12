/* TODO
	Record fastest time
	Add numeric input
	Style up
*/

'use strict';

import createPhoneBook from './phonebook';
import random from './random';
import Store from './store';
import Events from './events';
import Clicks from './clicks';
import View from './view';
import Timer from './timer';

const numberOfNames = 50 * 1000 + random(20 * 1000);

let store = new Store();
let events = new Events();
let clicks = new Clicks(events);

let appView = new View('app', store, function() {
	switch (this.data.screen) {
	case 'intro':
		return `
			<section class="intro">
				<p class="title">
					&nbsp;██████╗&nbsp;███████╗███████╗██╗&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;██╗███╗&nbsp;&nbsp;&nbsp;██╗███████╗&nbsp;&nbsp;&nbsp;&nbsp;███████╗███████╗&nbsp;█████╗&nbsp;██████╗&nbsp;&nbsp;██████╗██╗&nbsp;&nbsp;██╗<br/>
					██╔═══██╗██╔════╝██╔════╝██║&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;██║████╗&nbsp;&nbsp;██║██╔════╝&nbsp;&nbsp;&nbsp;&nbsp;██╔════╝██╔════╝██╔══██╗██╔══██╗██╔════╝██║&nbsp;&nbsp;██║<br/>
					██║&nbsp;&nbsp;&nbsp;██║█████╗&nbsp;&nbsp;█████╗&nbsp;&nbsp;██║&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;██║██╔██╗&nbsp;██║█████╗&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;███████╗█████╗&nbsp;&nbsp;███████║██████╔╝██║&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;███████║<br/>
					██║&nbsp;&nbsp;&nbsp;██║██╔══╝&nbsp;&nbsp;██╔══╝&nbsp;&nbsp;██║&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;██║██║╚██╗██║██╔══╝&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;╚════██║██╔══╝&nbsp;&nbsp;██╔══██║██╔══██╗██║&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;██╔══██║<br/>
					╚██████╔╝██║&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;██║&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;███████╗██║██║&nbsp;╚████║███████╗&nbsp;&nbsp;&nbsp;&nbsp;███████║███████╗██║&nbsp;&nbsp;██║██║&nbsp;&nbsp;██║╚██████╗██║&nbsp;&nbsp;██║<br/>
					&nbsp;╚═════╝&nbsp;╚═╝&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;╚═╝&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;╚══════╝╚═╝╚═╝&nbsp;&nbsp;╚═══╝╚══════╝&nbsp;&nbsp;&nbsp;&nbsp;╚══════╝╚══════╝╚═╝&nbsp;&nbsp;╚═╝╚═╝&nbsp;&nbsp;╚═╝&nbsp;╚═════╝╚═╝&nbsp;&nbsp;╚═╝<br/>
				</p>
				<p>You kids don't know you're born.</p>
				<p>When I was your age we didn't have no Google or autocomplete.</p>
				<p>If we wanted to find something out we either had to ask someone who knew, or find a book then find it in that book.</p>
				<p>To help educate you about how lucky you all are, here's a little game called "finding someone's phone number in the phone book". We used to play it all the time back in the day.</p>
				<p>It's easy - I tell you someone's name, you have to find their phone number for me. As quickly as possible.</p>
				<p>Ready? No? Tough.</p>

				<button on-click="intro-begin">Let's begin</button>
			</section>
		`;

	case 'game':
		let failures = appView.data.failures.map((failure) => {
			return `<li>${failure} was not correct</li>`;
		});

		return `
			<section class="game">
				<p>Please find the phone number for:</p>
				<p class="highlight">${this.data.target.title} ${this.data.target.initial} ${this.data.target.surname}</p>

				<p><input type="text" maxlength="7" id="game-input"><button on-click="game-submit"><span class="icon">&phone;</span> Dial</button></p>

				<button on-click="game-begin">Get out phonebook</button>

				<ul>
					${failures.join('')}
				</ul>
			</section>
		`;

	case 'book':
		let intervals = 20;

		let links = '';

		for (let index = 1; index < intervals; index++) {
			let point = Math.round((index / intervals) * 100);
			let page = Math.round(point / 100 * appView.data.phoneBook.pages.length);

			links += `<li><button on-click="book-open" on-click-data="${page}">${point}%</button></li>`;
		}

		return `
			<section class="book">
				<p class="highlight">The phonebook</p>

				<p>Imagine this is the phonebook. It was a physical book printed on cheap paper, several inches thick and thousands of pages long.</p>
				<p>Take a guess how far through the book you want to open</p>

				<ul>
					${links}
				</ul>

				<button on-click="book-back"><span class="icon">&larrhk;</span> Put away phonebook</button>
			</section>
		`;

	case 'page':
		let page = appView.data.phoneBook.pages[appView.data.phoneBook.currentPage];

		let entries = page.map((entry) => {
			return `<li><span class="name">${entry.surname}, ${entry.title} ${entry.initial}</span><span>&nbsp;</span><span class="number">${entry.number}</span></li>`;
		});

		return `
			<section class="page">
				<button on-click="page-back-few" class="small" title="Back a few pages"><span class="icon">&Larr;</span></button>
				<button on-click="page-back-one" class="small" title="Back one page"><span class="icon">&leftarrow;</span></button>
				<button on-click="page-forward-one" class="small" title="Forward one page"><span class="icon">&rightarrow;</span></button>
				<button on-click="page-forward-few" class="small" title="Forward a few pages"><span class="icon">&Rarr;</span></button>
				<button on-click="page-back" class="small" title="Close phonebook"><span class="icon">&larrhk;</span></button>

				<p class="highlight">Page number: ${appView.data.phoneBook.currentPage + 1}</p>
				<ul>
					${entries.join('')}
				</ul>
			</section>
		`;

	case 'success':
		return `
			<section class="success">
				<p class="title">
					███████╗██╗&nbsp;&nbsp;&nbsp;██╗&nbsp;██████╗&nbsp;██████╗███████╗███████╗███████╗<br/>
					██╔════╝██║&nbsp;&nbsp;&nbsp;██║██╔════╝██╔════╝██╔════╝██╔════╝██╔════╝<br/>
					███████╗██║&nbsp;&nbsp;&nbsp;██║██║&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;██║&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;█████╗&nbsp;&nbsp;███████╗███████╗<br/>
					╚════██║██║&nbsp;&nbsp;&nbsp;██║██║&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;██║&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;██╔══╝&nbsp;&nbsp;╚════██║╚════██║<br/>
					███████║╚██████╔╝╚██████╗╚██████╗███████╗███████║███████║<br/>
					╚══════╝&nbsp;╚═════╝&nbsp;&nbsp;╚═════╝&nbsp;╚═════╝╚══════╝╚══════╝╚══════╝<br/>
				</p>
				<p>Well done - that was the correct number for ${this.data.target.title} ${this.data.target.surname}!</p>
				<p>You did it in ${timerView.data.minutes}:${timerView.data.seconds}.${timerView.data.milliseconds}</p>

				<button on-click="success-again">Play again</button>
			</section>
		`;

	default:
		return `
			Nothing here
		`;
	}
});

let timerView = new View('timer', {}, function() {
	if (this.data.visible) {
		return `
			<div>${this.data.minutes}:${this.data.seconds}.${this.data.milliseconds}</div>
		`;
	} else {
		return '';
	}	
});

let timer = new Timer(timerView);

clicks
	.on('intro-begin', () => { newGame(); })
	.on('game-begin', () => { gotoScreen('book'); })
	.on('game-submit', () => { checkAnswer(); })
	.on('book-open', (page) => { gotoPage(page, 40); })
	.on('book-back', () => { gotoScreen('game'); })
	.on('page-back', () => { gotoScreen('book'); })
	.on('page-back-few', () => { gotoPage(appView.data.phoneBook.currentPage -= 6, 4); })
	.on('page-back-one', () => { gotoPage(appView.data.phoneBook.currentPage -= 1); })
	.on('page-forward-few', () => { gotoPage(appView.data.phoneBook.currentPage += 6, 4); })
	.on('page-forward-one', () => { gotoPage(appView.data.phoneBook.currentPage += 1); })
	.on('success-again', () => { newGame(); });

function newGame() {
	let phoneBook = createPhoneBook(numberOfNames);

	appView.update({
		phoneBook: phoneBook,
		target: random(phoneBook.results),
		screen: 'game',
		failures: []
	});

	// console.log(appView.data.target);

	timer.reset().show().start();
}

function gotoScreen(screen) {
	appView.update({ screen: screen });
}

function gotoPage(page, randomVariation = 0) {
	if (randomVariation > 0) {
		page = Math.round(page - (randomVariation / 2) + random(randomVariation));
	}

	if (page < 0) {
		page = 0;
	}

	if (page > appView.data.phoneBook.pages.length - 1) {
		page = appView.data.phoneBook.pages.length - 1;
	}

	appView.update({ screen: 'page', phoneBook: { currentPage: page } });
}

function success() {
	timer.stop().hide();
	gotoScreen('success');	
}

function failure(answer) {
	if (answer !== '') {
		appView.data.failures.push(answer);
		appView.data.failures = appView.data.failures.slice(-6);

		appView.update({
			failures: appView.data.failures
		});
	}
}

function checkAnswer() {
	let answer = document.getElementById('game-input').value.replace('-', '').trim();
console.log(answer);
	if (answer === appView.data.target.number.replace('-', '')) {
		success();
	} else {
		failure(answer);
	}
}

gotoScreen('intro');
