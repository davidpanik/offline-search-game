'use strict';

import createPhoneBook from './phonebook';
import random from './random';

const numberOfNames = 30 * 1000;

let results = createPhoneBook(numberOfNames);

console.log(results);

let target = random(results);

console.log(target);
