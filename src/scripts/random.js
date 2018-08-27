function random(from) {
	if (Array.isArray(from)) {
		return from[Math.floor(Math.random() * from.length)]; // Array
	} else {
		return Math.floor(Math.random() * from); // Number
	}
}

export default random;
