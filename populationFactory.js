class PopulationFactory {
	constructor(populationSize, chromosomeLength, mutationRate, worldMap) {
		this.populationSize = populationSize;
		this.mutationRate = mutationRate;
		this.worldMap = worldMap;
		this.haploidFactory = new HaploidFactory(chromosomeLength);
		this.diploidFactory = new DiploidFactory(chromosomeLength);
	}

	createHaploidPopulation() {
		const population = new Popualtion(this.populationSize, this.haploidFactory, this.mutationRate, this.worldMap);
		return population;
	}

	createDiploidPopulation() {
		const population = new Popualtion(this.populationSize, this.diploidFactory, this.mutationRate, this.worldMap);
		return population;
	}
}