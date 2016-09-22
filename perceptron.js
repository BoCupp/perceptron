function Perceptron(weights, classifierFunction) {
	if (weights instanceof Array) {
		this.weights = weights;
	} else {
		this.weights = [];
	}

	if (classifierFunction instanceof Function) {
		this.classifierFunction = classifierFunction;
	} else {
		this.classifierFunction = function(weightedSum) { 
			return weightedSum >= 0 ? +1 : -1;
		}
	}
}

Perceptron.prototype = {
	react: function Perceptron_react(stimulus) {
		var weightedSum = 0;
		var i;

		for (var i = 0; i < stimulus.length; i++) {
			weightedSum = weightedSum + stimulus[i] * this.weights[i];
		}

		weightedSum += /* hard-coded input of 1 allows last weight to be learned bias */ 1 * this.weights[stimulus.length];


		return this.classifierFunction(weightedSum);
	},

	learn: function Perceptron_learn(stimulus, desired) {
		// 1 + stimulus vector size allows room for last weight to represent learned bias, where input will be hard coded to 1
		while (stimulus.length + 1 > this.weights.length) {
			this.weights.push(0);
		}

		var actual = this.react(stimulus);
		
		if (actual == desired) {
			return;
		}

		// Adjust for error
		for (var i = 0; i < stimulus.length; i++) {
			this.weights[i] = this.weights[i] + desired * stimulus[i];
		}
		// And learned bias adjustment
		this.weights[stimulus.length] = this.weights[stimulus.length] + desired;
	}
};


