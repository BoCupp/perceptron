function Perceptron(weights) {
	if (typeof weights === "undefined") {
		this.weights = [];
	} else {
		this.weights = weights;		
	}
}

Perceptron.prototype = {
	react: function Perceptron_generate(stimulus) {
		var weightedSum = 0;
		var i;

		for (var i = 0; i < stimulus.length; i++) {
			weightedSum = weightedSum + stimulus[i] * this.weights[i];
		}

		return weightedSum;
	},

	learn: function Perceptron_learn(stimulus, desired) {
		while (stimulus.length > this.weights.length) {
			this.weights.push(0);
		}

		var actual = this.react(stimulus);
		var delta = desired - actual;

		var learningRate = 0.2;
		
		for (var i = 0; i < stimulus.length; i++) {
			if (stimulus[i] != 0) {
				this.weights[i] = this.weights[i] + delta / stimulus[i] * learningRate;
			}
		}
	}
};


