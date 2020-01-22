class Individual {
	constructor() {
		this.fitness = 0;
		this.foundFood = false;
	}

	setFoundFood() {
		this.foundFood = true;
	}

	getFoundFood(){
		return this.foundFood;
	}

	setFitness(fitness) {
		this.fitness = fitness;
	}

	getFitness() {
		return this.fitness;
	}

	// abstract method
	expressChromosome() {
		console.throw();
	}

	// abstract method
	mutate() {
		console.throw();
	}

	// abstract method
	crossWith(individual) {
		console.throw();
	}

	// abstract method
	updateChromosomeLength(chromosomeLength) {
		console.throw();
	}
}