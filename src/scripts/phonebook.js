/* TODO
	Avoid duplicates
*/

'use strict';

import random from './random';

const titles = 'Dr,Dr,Dr,Prof,Mr,Mr,Mr,Mr,Mr,Mr,Mr,Mr,Mr,Mr,Mrs,Mrs,Mrs,Mrs,Miss,Miss,Miss,Ms,Ms,Ms,Ms,Ms'.split(',');
const initials = 'AAAABBBCCCDDDDDDEEEFFGGGGHIJJJJJKLLMMNOOOPOQRRRRSSSTTTUVWWXYZ'.split('');
const surSingle = 'White,Brown,Black,Sharp,Bruce,Smith,Martin,King,Lister,Cooper,Nelson,Jones,Williams,Taylor,Davies,Wilson,Evans,Thomas,Fletcher,Johnson,Roberts,Walker,Robinson,Thomson,Thompson,Whyte,Hughes,Edwards,Green,Lewis,Sharp,Hill,Martin,Jackson,Clark,Clarke,Giles,Foster,Wood,Woods,Fletcher,Lang,Long,Frost'.split(',');
const surPre = 'Al,Ald,An,Rich,Lam,Ang,Dil,Forest,Art,Bab,Bay,Bar,Bed,Beg,Ben,Ber,Bod,Bog,Drum,Brand,Bail,Brock,Brook,Gower,Chaff,Burn,Burr,Cal,Camp,Ches,Gos,Goth,Not,Knot,Scot,Far,Jack,Fox,Ding,May,Pol,Long,Lang,Wex,Wess,Ed,Mont,Ham,Nor,Fil,Curr,Pat,Cor,Ken,Fra,Frey,Char,An,Gib,Sta,Cal,Mil,Pot,Poth,Rob,Rab,Roy,Rae,Mit,Mitch,Bren,Ken,Mal,Mil,Sto,Wil,Wyl,Will,God,Godd,Prat,Pay,Woo,Mun,Forth,Car,Thom,Tom,Fox,Had,Hadd,Kemp,Hemp,Cor,Corn,Ward,Kel,Hamp,Mar,Sal,Pon,Faw,Clar,Hark,Hig,Ril,Sam,Cham,Champ,Clap,Der,Deer,Monk,Haver,Kirk,Kill,Kin,Gon'.split(',');
const surSuf = 'cok,cott,bery,cock,bert,burger,ford,chester,good,way,man,mon,der,ard,good,smith,martin,er,ick,wick,ing,ington,water,well,ison,son,bell,bury,scott,scot,son,son,son,son,mond,ger,wart,rey,castle,finch,rose,caster,ton,ch,mouth,tton,mick,mickel,ser,lotte,ond,rck,der,ne,ner,nes,ecary,ie,ell,net,nett,ard,chett,ler,ro,worth,will,willis,well,robe,rope,man,mann,vil,vill,ness,ey,y,ch,cort,court'.split(',');
const numbersPerPage = 400;

function createName() {
	let title = random(titles);
	let initial = random(initials) + (random(8) === 1 ? random(initials) + (random(4) === 1 ? random(initials) : '') : '');
	let surname = random(8) === 1 ? random(surSingle) :
		(random(10) === 1 ? (random(2) === 1 ? 'Mc' : 'Mac') : '') +
		(modify(random(surPre)) + random(surSuf)) +
		(random(10) === 1 ? 'e' : '');
	let number = '' + random(10) + random(10) + random(10) + '-' + random(10) + random(10) + random(10);

	return ({
		title: title,
		initial: initial,
		surname: surname,
		number: number
	});
}

function modify(str) {
	let vowels = 'aeiouy'.split('');

	if (random(2) === 1) {
		let index = random(str.length - 1) + 1;

		let replacement = '';
		if (vowels.includes(str.charAt(index))) {
			do {
				replacement = random(vowels); // Replace vowel
			} while (replacement !== str.charAt(index));
		} else {
			replacement = str.charAt(index) + str.charAt(index); // Double up consonant
		}

		return str.slice(0, index) + replacement + str.slice(index + 1);
	} else {
		return str;
	}
}

function alphabetical(alpha, beta, key1, key2, key3) {
	if (alpha[key1] < beta[key1]) {
		return -1;
	} else if (alpha[key1] > beta[key1]) {
		return 1;
	} else {
		if (key2) {
			return alphabetical(alpha, beta, key2, key3);
		} else {
			return 0;
		}
	}
}

function chunkArray(myArray, chunkSize) {
	let tempArray = [];

	for (let index = 0; index < myArray.length; index += chunkSize) {
		tempArray.push(myArray.slice(index, index + chunkSize));
	}

	return tempArray;
}

function createPhoneBook(length) {
	let results = Array.from({ length: length }, () => createName());
	let pages = [];

	results
		.sort((alpha, beta) => { return alphabetical(alpha, beta, 'surname', 'initial', 'title'); });

	pages = chunkArray(results, numbersPerPage);

	return {
		results: results,
		pages: pages,
		currentPage: 0
	};
}

export default createPhoneBook;
