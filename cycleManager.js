class CycleManager {
	constructor(population, cycleLength, meanFitnessCycle) {
		this.population = population;
		this.cycleLength = cycleLength;
		this.meanFitnessCycle = meanFitnessCycle;
		this.meanFitnessCycleSum = 0;
		this.meanFitness = [];
		this.stepsDone = 0;
	}

	reset() {
		this.stepsDone = 0;
	}

	clearFitnessArray() {
		this.meanFitness = [];
		this.meanFitnessCycleSum = 0;
	}

	cycleIsOver() {
		return this.stepsDone >= this.cycleLength;
	}

	fitnessCalculation() {
		this.population.calculateFitness();
		this.meanFitnessCycleSum += this.population.getMeanFitness();
		if(this.stepsDone % this.meanFitnessCycle == 0) {
			this.meanFitness.push(this.meanFitnessCycleSum / this.meanFitnessCycle);
			this.meanFitnessCycleSum = 0;
		}
	}

	nextStep() {
		this.fitnessCalculation();
		this.population.crossover();
		this.population.mutation();
		this.stepsDone++;
	}

	start() {
		this.reset();
		while(!this.cycleIsOver()) {
			this.nextStep();
		}
		this.fitnessCalculation();
		this.reset();
	}

	getFitnessArray() {
		return this.meanFitness;
	}
}