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
		// this._data = Object.assign({}, this._data, newData);
		this._data = merge(this._data, newData);
		this.render();
	}

	render() {
		if (this.target) {
			this.target.innerHTML = this.template();
		}

		return this;
	}
}

const merge = (target, source) => {
	// Iterate through `source` properties and if an `Object` set property to merge of `target` and `source` properties
	for (let key of Object.keys(source)) {
		if (source[key] instanceof Object && key in target) {
			Object.assign(source[key], merge(target[key], source[key]));
		}
	}

	// Join `target` and modified `source`
	Object.assign(target || {}, source);

	return target
};

export default View;
