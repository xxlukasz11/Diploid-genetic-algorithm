class CycleManager {
	constructor(population, cycleLength) {
		this.population = population;
		this.cycleLength = cycleLength;
		this.stepsDone = 0;
	}

	reset() {
		this.stepsDone = 0;
	}

	cycleIsOver() {
		return this.stepsDone >= this.cycleLength;
	}

	nextStep() {
		this.population.calculateFitness();
		this.population.crossover();
		this.population.mutation();
		this.stepsDone++;
	}

	start() {
		while(!this.cycleIsOver()) {
			this.nextStep();
		}
		this.population.calculateFitness();
	}
}