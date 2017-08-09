const defaultValues = {
	startVal: 0,
	endVal: 100,
	duration: 2000,
	decimals: 0,
	options: {
		separator: ",",
		decimal: ".",
		grouping: false
	}
};

class Counter {
	constructor(selector, startVal, endVal, duration, decimals, options = {}) {
		let lastTime = 0;
		this.selector = selector;
		this.startVal = startVal || defaultValues.startVal;
		this.endVal = endVal || defaultValues.endVal;
		this.duration = duration || defaultValues.duration;
		this.decimals = Math.max(0, decimals) || defaultValues.decimals;
		this.countDown = (this.startVal > this.endVal);
		this.frameVal = this.startVal;
		this.options = {
			separator: options.separator || defaultValues.options.separator,
			decimal: options.decimal || defaultValues.options.decimal,
			grouping: options.grouping || defaultValues.options.grouping
		}
	}

	formatNumber(number) {
		number = number.toFixed(this.decimals);
		number += '';
		let x, x1, x2, rgx;
		x = number.split('.');
		x1 = x[0];
		x2 = x.length > 1 ? this.options.decimal + x[1] : "";
		rgx = /(\d+)(\d{3})/;
		if(this.options.grouping) {
			while (rgx.test(x1)) {
				x1 = x1.replace(rgx, '$1' + this.options.separator + '$2');
			}
		}
		return x1 + x2;
	}


	// Print value
	// ------------------------------------
	printValue(value) {
		this.selector.innerHTML = value;
	}

	// Count animation
	// -------------------------------------
	count(){
		let timestamp = new Date().getTime();
		let progress = timestamp - this.startTime;

		// animation
		if(this.countDown) {
			this.frameVal = this.startVal - (this.startVal - this.endVal) * (progress / this.duration);
			this.frameVal = (this.frameVal < this.endVal) ? this.endVal : this.frameVal;
		} else {
			this.frameVal = this.startVal + (this.endVal - this.startVal) * (progress / this.duration);
			this.frameVal = (this.frameVal > this.endVal) ? this.endVal : this.frameVal;
		}

		this.frameVal = this.formatNumber(this.frameVal);
		this.printValue(this.frameVal);

		if(progress < this.duration) {
			requestAnimationFrame(this.count.bind(this));
		}
	}

	// Start counter
	// -------------------------------------
	start(){
		this.startTime = new Date().getTime();
		this.animation = requestAnimationFrame(this.count.bind(this));
	}
}


// USAGE

// var counter = new Counter(selector, startVal, endVal, duration, decimals, { separator: ",", decimal: ".", grouping: false })
// counter.start();


// * selector = target element,
// * startVal = the value to begin at,
// * endVal = the value to arrive at,
// * duration = duration in miliseconds, default 2000
// * decimals = number of decimal places, defualt 0,
// * options {separator, decimal, grouping} = additional view options


