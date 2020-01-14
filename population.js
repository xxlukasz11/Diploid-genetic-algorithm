class Popualtion {
	constructor(populationSize, individualFactory, mutationRate, worldMap) {
		this.populationSize = populationSize;
		this.individuals = new Array(populationSize);
		this.individualFactory = individualFactory;
		this.mutationRate = mutationRate;
		this.worldMap = worldMap;
		this.createIndividuals();
	}

	setWorldMap(worldMap) {
		this.worldMap = worldMap;
	}

	createIndividuals() {
		for(let i = 0; i < this.populationSize; ++i) {
			this.individuals[i] = this.individualFactory.create();
		}
	}

	calculateFitness() {
		const fitnessCalculator = new FitnessCalculator(this.worldMap);
		for(let individual of this.individuals) {
			fitnessCalculator.calculate(individual);
		}
	}

	crossover() {
		console.log("crossover");
	}

	mutation() {
		for(let individual of this.individuals) {
			individual.mutate(this.mutationRate);
		}
	}

}