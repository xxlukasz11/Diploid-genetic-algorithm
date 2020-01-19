class Popualtion {
	constructor(populationSize, individualFactory, mutationRate, worldMap) {
		this.populationSize = populationSize;
		this.individuals = new Array(populationSize);
		this.individualFactory = individualFactory;
		this.mutationRate = mutationRate;
		this.worldMap = worldMap;
		this.mean_fitness = 0;
		this.createIndividuals();
	}

	setWorldMap(worldMap) {
		this.worldMap = worldMap;
	}

	changeChromosomeLength(chromosomeLength) {
		this.individualFactory.updateChromosomeLength(chromosomeLength);
		for(let ind of this.individuals) {
			ind.updateChromosomeLength(chromosomeLength);
		}
	}

	createIndividuals() {
		for(let i = 0; i < this.populationSize; ++i) {
			this.individuals[i] = this.individualFactory.create();
		}
	}

	calculateFitness() {
		const fitnessCalculator = new FitnessCalculator(this.worldMap);
		let fitness_sum = 0;
		for(let individual of this.individuals) {
			const fitness = fitnessCalculator.calculate(individual);
			fitness_sum += fitness;
			individual.setFitness(fitness);
		}
		this.mean_fitness = fitness_sum / this.populationSize;
	}

	get_mean_fitness() {
		return this.mean_fitness;
	}

	crossover() {
		const crossoverManager = new CrossoverManager(this.individuals);
		this.individuals = crossoverManager.exclusiveCrossover();
	}

	mutation() {
		for(let individual of this.individuals) {
			individual.mutate(this.mutationRate);
		}
	}

	findBest() {
		let best = this.individuals[0];
		for(let ind of this.individuals) {
			if(ind.getFitness() > best.getFitness()) {
				best = ind;
			}
		}
		return best;
	}

}