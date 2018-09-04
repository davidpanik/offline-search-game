class Clicks {
	constructor(events, key = 'on-click', prefix = 'click-') {
		this.events = events;
		this.key = key;
		this.prefix = prefix;

		document.addEventListener('click', (event) => {
			if (event.target.getAttribute(this.key)) {
				this.events.emit(this.prefix + event.target.getAttribute(this.key));
			}
		});

		return this;
	}

	on(event, callback) {
		this.events.on(this.prefix + event, callback);

		return this;
	}

	off(event, callback) {
		this.events.off(this.prefix + event, callback);

		return this;
	}
}

export default Clicks;
