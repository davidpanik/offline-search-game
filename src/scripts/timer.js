class Timer {
	constructor(view) {
		this.view = view;
		this.active = false;
		this.increment = 100;

		this.reset();

		return this;
	}

	start() {
		this.active = true;
		this.tick();

		return this;
	}

	tick() {
		this.milliseconds += this.increment;

		if (++this.milliseconds >= 1000) {
			this.milliseconds -= 1000;
			this.seconds++;
		}

		if (this.seconds >= 60) {
			this.seconds -= 60;
			this.minutes++;
		}

		this.render();

		setTimeout(() => {
			if (this.active) {
				this.tick();
			}
		}, this.increment);
	}

	stop() {
		this.active = false;

		this.render();

		return this;
	}

	reset() {
		this.minutes = 0;
		this.seconds = 0;
		this.milliseconds = 0;

		this.render();

		return this;
	}	

	render() {
		this.view.update({
			minutes: this.format(this.minutes, 2),
			seconds: this.format(this.seconds, 2),
			milliseconds: this.format(this.milliseconds, 3)
		});

		return this;
	}

	format(number, places) {
		number = '' + number;

		while (number.length < places) {
			number = '0' + number;
		}

		return number;
	}

	hide() {
		this.view.update({
			visible: false
		});

		return this;
	}

	show() {
		this.view.update({
			visible: true
		});

		return this;
	}
}

export default Timer;
