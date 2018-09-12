'use strict';

import random from './random';

const titles = 'Dr,Dr,Dr,Prof,Mr,Mr,Mr,Mr,Mr,Mr,Mr,Mr,Mr,Mr,Mrs,Mrs,Mrs,Mrs,Miss,Miss,Miss,Ms,Ms,Ms,Ms,Ms'.split(',');
const initials = 'AAAABBBCCCDDDDDDEEEFFGGGGHIJJJJJKLLMMNOOOPOQRRRRSSSTTTUVWWXYZ'.split('');
const surSingle = 'White,Brown,Black,Sharp,Bruce,Smith,Martin,King,Lister,Cooper,Nelson,Jones,Williams,Taylor,Davies,Wilson,Evans,Thomas,Fletcher,Johnson,Roberts,Walker,Robinson,Thomson,Thompson,Whyte,Hughes,Edwards,Green,Lewis,Sharp,Hill,Martin,Jackson,Clark,Clarke,Giles,Foster,Wood,Woods,Fletcher,Lang,Long,Frost,Corbyn,Smith,Jones,Williams,Brown,Taylor,Davies,Wilson,Evans,Thomas,Johnson,Roberts,Walker,Wright,Thompson,Robinson,White,Hughes,Edwards,Hall,Green,Martin,Wood,Lewis,Harris,Clarke,Jackson,Clark,Turner,Scott,Hill,Moore,Cooper,Ward,Morris,King,Watson,Harrison,Morgan,Baker,Young,Patel,Allen,Anderson,Mitchell,Phillips,James,Campbell,Bell,Lee,Kelly,Parker,Davis,Bennett,Miller,Price,Shaw,Cook,Simpson,Griffiths,Richardson,Stewart,Marshall,Collins,Carter,Bailey,Murphy,Gray,Murray,Cox,Adams,Richards,Graham,Ellis,Wilkinson,Foster,Robertson,Chapman,Russell,Mason,Webb,Powell,Rogers,Gibson,Hunt,Holmes,Mills,Owen,Palmer,Matthews,Reid,Thomson,Fisher,Barnes,Knight,Lloyd,Harvey,Jenkins,Barker,Butler,Pearson,Stevens,Dixon,Hunter,Begum,Fletcher,Khan,Grant,Ross,Elliott,Johnston,Hamilton,Henderson,Andrews,Reynolds,Fox,Howard,Ford,Bradley,Saunders,Payne,Armstrong,Singh,West,Walsh,Pearce,Day,Dawson,Brooks,Atkinson,Cole,Kennedy,Lawrence,MacDonald,Burns,McDonald,Ball,Hussain,Burton,Williamson,Spencer,Gill,Booth,Rose,Davidson,Webster,Ali,Perry,Watts,Morrison,Hart,Kaur,Wells,Dunn,Wallace,Woods,Stevenson,Porter,Rees,Hudson,Ferguson,Gordon,Hayes,Lowe,Carr,Newman,Page,Berry,Barrett,Gregory,Francis,Oliver,Marsh,Gardner,Stone,Holland,Riley,Parsons,Newton,Ahmed,Hawkins,Black,Fraser,Bird,Harding,Reed,Ryan,Nicholson,Kerr,Cooke,Dean,Shepherd,Harper,Cunningham,Bates,Burgess,Quinn,Lane,Sharp,Walton,Bishop,Parry,Cross,Robson,Duncan,Warren,Long,Freeman,Chambers,Sutton,Yates,Nicholls,Hodgson,Curtis,Higgins,Hopkins,Nelson,Coleman,Paterson,Moss,Baxter,Potter,Douglas,Cameron,Watkins,Hutchinson,Jordan,Hardy,Osborne,Alexander,Wheeler,Griffin,Gallagher,May,Willis,Byrne,George,Crawford,Pritchard,Allan,Gilbert,Slater,Lawson,Hewitt,Rowe,Hammond,Miles,Read,Shah,Doyle'.split(',');
const surPre = 'Al,Ald,Ale,Ali,An,And,Ang,Arm,Art,At,Bab,Bail,Bak,Bar,Bark,Bax,Bay,Bed,Beg,Ben,Ber,Bir,Black,Blake,Bod,Bog,Booth,Brad,Brand,Bren,Brock,Brook,Bur,Burl,Burn,Burr,But,Byr,Cal,Cam,Camp,Car,Carr,Cer,Chaff,Cham,Champ,Chap,Char,Ches,Clap,Clar,Cole,Colm,Cook,Coop,Cor,Corn,Cox,Crav,Craw,Cun,Curr,Curt,Dav,Davis,Daw,Day,Dean,Deer,Der,Dil,Ding,Dix,Don,Dor,Doug,Doyle,Drac,Drum,Dry,Duck,Dun,Dunc,Ed,Egg,El,Ell,Em,En,Epp,Erin,Ev,Eve,Ew,Far,Faw,Fen,Fer,Fig,Fil,Flet,Flin,Ford,Forest,Forth,Fox,Fra,Free,Frey,Gall,Gard,Gay,Ger,Gib,Gil,God,Gon,Gos,Goth,Gower,Gran,Grin,Gray,Green,Grey,Grif,Guard,Had,Hadd,Halt,Ham,Hamp,Har,Hark,Harris,Hat,Haver,Haw,Hayes,Hemp,Hen,Hew,Hig,Hodg,Hol,Hop,Hud,Hunt,Hutch,Hyl,Hym,Il,Inn,Ir,Jack,Jal,Jen,John,Jor,Jul,Kain,Kar,Kel,Kemp,Ken,Ker,Kev,Kill,Kin,King,Kirk,Knot,Krin,Lam,Lang,Lar,Law,Lay,Laws,Lew,Lin,Long,Lov,Lowe,Lyn,Mal,Mar,Mas,Matt,May,Mil,Miles,Mit,Mitch,Monk,Mont,Mor,Moss,Mun,Nag,Nay,Nel,New,Nic,Nor,Not,Nyr,Oak,Ogil,Old,Oliv,Om,Ord,Orm,Os,Owen,Palm,Par,Park,Pat,Pay,Pea,Pear,Phil,Pol,Pon,Por,Pot,Poth,Pow,Prat,Prit,Qui,Queen,Rab,Rae,Ram,Rand,Rav,Read,Reed,Rees,Reyn,Reese,Rich,Ril,Rile,Rip,Rob,Roger,Ros,Rose,Row,Rowe,Roy,Ruf,Rupe,Russ,Ryan,Ryl,Sal,Sag,Sam,Saun,Scot,Shah,Shaw,Shep,Shin,Simp,Spen,Spy,Sta,Ste,Stev,Stew,Sto,Stone,Sutt,Tan,Tar,Tay,Ted,Tell,Tern,Thom,Til,Tim,Tin,Tom,Ton,Torv,Trist,Turn,Una,Ug,Un,Ur,Val,Ve,Vin,Vo,Wal,Ward,Wat,Watk,Web,Wess,West,Wex,Wil,Will,Woo,Wyl,Yar,Yat,Yen,Yell'.split(',');
const surSuf = 'ant,ard,aster,avril,band,bell,bert,bery,borne,brawn,brook,broom,burger,bury,bury,byn,caster,castle,ch,ch,cher,chester,chett,cleft,clive,cock,cok,cort,cott,court,dall,dan,den,der,der,ding,drew,dry,dye,e,ecary,ell,em,ennis,er,ester,ey,fax,fen,fer,finch,ford,ford,fry,gal,gan,ger,gess,gin,goff,good,good,ham,hay,hem,herd,hester,hope,ick,ie,ince,ing,ing,ing,ington,inter,ison,kell,ken,kin,kirk,kit,lan,lay,leigh,len,ler,lester,lor,lord,lotte,love,ly,man,man,man,mann,martin,may,merck,mert,mick,mickel,mon,mon,mond,mont,mort,mouth,msby,natt,nay,ne,nell,nelly,ner,nes,ness,net,nett,nord,oat,oat,olly,ond,orm,ott,our,owen,ramm,ray,rck,rey,rey,ric,rich,riley,rive,rn,ro,rob,robe,rope,rose,rye,san,scot,scott,sea,ser,smith,son,son,son,son,son,son,son,spon,ster,ster,strong,suther,sutter,tar,ter,tet,tie,tin,tom,ton,ton,ton,ton,tter,tton,ty,vere,vil,vill,vy,vy,wart,water,wan,way,well,well,whistle,wick,will,willis,winter,won,wont,worth,wright,wry,y,ye'.split(',');
const numbersPerPage = 90;

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

	if (random(4) === 1) {
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

	results = results.filter((value, index, self) => {
		let neighbour = self[index + 1];

		if (!neighbour) {
			return true;
		}

		return (value.title !== neighbour.title && value.initial !== neighbour.initial && value.surname !== neighbour.surname);
	});

	pages = chunkArray(results, numbersPerPage);

	return {
		results: results,
		pages: pages,
		currentPage: 0
	};
}

export default createPhoneBook;
