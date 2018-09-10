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
	}

	reset() {
		this.minutes = 0;
		this.seconds = 0;
		this.milliseconds = 0;

		this.render();
	}	

	render() {
		this.view.update({
			minutes: this.minutes,
			seconds: this.seconds,
			milliseconds: this.milliseconds,
		});
	}

	hide() {
		this.view.update({
			visible: false
		});
	}

	show() {
		this.view.update({
			visible: true
		});
	}
}

export default Timer;
