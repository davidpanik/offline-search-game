'use strict';

import random from './random';

const titles = 'Dr,Dr,Dr,Prof,Mr,Mr,Mr,Mr,Mr,Mr,Mr,Mr,Mr,Mr,Mrs,Mrs,Mrs,Mrs,Miss,Miss,Miss,Ms,Ms,Ms,Ms,Ms'.split(',');
const initials = 'AAAABBBCCCDDDDDDEEEFFGGGGHIJJJJJKLLMMNOOOPOQRRRRSSSTTTUVWWXYZ'.split('');
const surSingle = 'White,Brown,Black,Sharp,Bruce,Smith,Martin,King,Lister,Cooper,Nelson,Jones,Williams,Taylor,Davies,Wilson,Evans,Thomas,Fletcher,Johnson,Roberts,Walker,Robinson,Thomson,Thompson,Whyte,Hughes,Edwards,Green,Lewis,Sharp,Hill,Martin,Jackson,Clark,Clarke,Giles,Foster,Wood,Woods,Fletcher,Lang,Long,Frost,Corbyn,Smith,Jones,Williams,Brown,Taylor,Davies,Wilson,Evans,Thomas,Johnson,Roberts,Walker,Wright,Thompson,Robinson,White,Hughes,Edwards,Hall,Green,Martin,Wood,Lewis,Harris,Clarke,Jackson,Clark,Turner,Scott,Hill,Moore,Cooper,Ward,Morris,King,Watson,Harrison,Morgan,Baker,Young,Patel,Allen,Anderson,Mitchell,Phillips,James,Campbell,Bell,Lee,Kelly,Parker,Davis,Bennett,Miller,Price,Shaw,Cook,Simpson,Griffiths,Richardson,Stewart,Marshall,Collins,Carter,Bailey,Murphy,Gray,Murray,Cox,Adams,Richards,Graham,Ellis,Wilkinson,Foster,Robertson,Chapman,Russell,Mason,Webb,Powell,Rogers,Gibson,Hunt,Holmes,Mills,Owen,Palmer,Matthews,Reid,Thomson,Fisher,Barnes,Knight,Lloyd,Harvey,Jenkins,Barker,Butler,Pearson,Stevens,Dixon,Hunter,Begum,Fletcher,Khan,Grant,Ross,Elliott,Johnston,Hamilton,Henderson,Andrews,Reynolds,Fox,Howard,Ford,Bradley,Saunders,Payne,Armstrong,Singh,West,Walsh,Pearce,Day,Dawson,Brooks,Atkinson,Cole,Kennedy,Lawrence,MacDonald,Burns,McDonald,Ball,Hussain,Burton,Williamson,Spencer,Gill,Booth,Rose,Davidson,Webster,Ali,Perry,Watts,Morrison,Hart,Kaur,Wells,Dunn,Wallace,Woods,Stevenson,Porter,Rees,Hudson,Ferguson,Gordon,Hayes,Lowe,Carr,Newman,Page,Berry,Barrett,Gregory,Francis,Oliver,Marsh,Gardner,Stone,Holland,Riley,Parsons,Newton,Ahmed,Hawkins,Black,Fraser,Bird,Harding,Reed,Ryan,Nicholson,Kerr,Cooke,Dean,Shepherd,Harper,Cunningham,Bates,Burgess,Quinn,Lane,Sharp,Walton,Bishop,Parry,Cross,Robson,Duncan,Warren,Long,Freeman,Chambers,Sutton,Yates,Nicholls,Hodgson,Curtis,Higgins,Hopkins,Nelson,Coleman,Paterson,Moss,Baxter,Potter,Douglas,Cameron,Watkins,Hutchinson,Jordan,Hardy,Osborne,Alexander,Wheeler,Griffin,Gallagher,May,Willis,Byrne,George,Crawford,Pritchard,Allan,Gilbert,Slater,Lawson,Hewitt,Rowe,Hammond,Miles,Read,Shah,Doyle'.split(',');
const surPre = 'Al,Ald,Ale,Ali,An,And,Ang,Arm,Art,At,Bab,Bail,Bak,Bar,Bark,Bax,Bay,Bed,Beg,Ben,Ber,Bir,Bod,Bog,Booth,Brad,Brand,Bren,Brock,Brook,Bur,Burn,Burr,But,Byr,Cal,Cam,Camp,Car,Carr,Chaff,Cham,Champ,Chap,Char,Ches,Clap,Clar,Cole,Cook,Coop,Cor,Corn,Cox,Craw,Cun,Curr,Curt,Dav,Davis,Daw,Day,Dean,Deer,Der,Dil,Ding,Dix,Doug,Doyle,Drum,Dun,Dunc,Ed,El,Ell,Ev,Far,Faw,Fil,Flet,Ford,Forest,Forth,Fox,Fra,Free,Frey,Gall,Gard,Gib,Gil,Gill,God,Godd,Gon,Gos,Goth,Gower,Gra,Green,Grif,Had,Hadd,Ham,Hamp,Har,Hark,Harris,Haver,Haw,Hayes,Hemp,Hen,Hew,Hig,Hodg,Hol,Hop,Hud,Hunt,Hutch,Il,Inn,Ir,Jack,Jen,John,Jor,Kel,Kemp,Ken,Ker,Kill,Kin,King,Kirk,Knot,Lam,Lang,Law,Laws,Lin,Long,Lowe,Lyn,Mal,Mar,Mas,Matt,May,Mil,Miles,Mit,Mitch,Monk,Mont,Mor,Moss,Mun,Nel,New,Nic,Nor,Not,Oliv,Os,Owen,Palm,Par,Park,Pat,Pay,Pea,Pear,Phil,Pol,Pon,Por,Pot,Poth,Pow,Prat,Prit,Qui,Rab,Rae,Read,Reed,Rees,Reyn,Rich,Ril,Rile,Rob,Roger,Ros,Rose,Row,Rowe,Roy,Ruf,Russ,Ryan,Sal,Sam,Saun,Scot,Shah,Shaw,Shep,Simp,Spen,Sta,Ste,Stev,Stew,Sto,Stone,Sutt,Tan,Tar,Tay,Thom,Tom,Trist,Turn,Un,Val,Vin,Wal,Ward,Wat,Watk,Web,Wess,West,Wex,Wil,Will,Woo,Wyl,Yar,Yat'.split(',');
const surSuf = 'ard,bell,bert,bery,borne,burger,bury,bury,byn,caster,castle,ch,ch,cher,chester,chett,cock,cok,cort,cott,court,der,der,drew,e,ecary,ell,ennis,er,ey,fax,finch,ford,ford,gan,ger,gess,good,good,ham,herd,hope,ick,ie,ing,ing,ing,ington,ison,kin,leigh,ler,lor,lotte,ly,man,man,man,mann,martin,mick,mickel,mon,mon,mond,mont,mouth,ne,ner,nes,ness,net,nett,ond,rck,rey,rey,ric,rn,ro,robe,rope,rose,scot,scott,ser,smith,son,son,son,son,son,son,son,ster,ster,strong,tie,tin,ton,ton,ton,ton,tter,tton,ty,vil,vill,wart,water,way,well,well,wick,will,willis,worth,wright,y,ye'.split(',');
const numbersPerPage = 400;

function createName() {
	let title = random(titles);
	let initial = random(initials) + (random(8) === 1 ? random(initials) + (random(4) === 1 ? random(initials) : '') : '');
	let surname = random(7) === 1 ? random(surSingle) :
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
