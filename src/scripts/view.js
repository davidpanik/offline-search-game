class View {
	constructor(target, data, template) {
		this.target = (typeof(target) === 'string') ? document.getElementById(target) : target;
		this.template = template;
		this._data = data;

		this.render();

		return this;
	}

	get data() {
		return this._data;
	}

	set data(data) {
		this._data = data;
		this.render();
	}

	update(newData) {
		this._data = Object.assign({}, this._data, newData);
		this.render();
	}

	render() {
		if (this.target) {
			this.target.innerHTML = this.template();
		}

		return this;
	}
}

export default View;
