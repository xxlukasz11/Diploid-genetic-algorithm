class FitnessCalculator {
	constructor(worldMap) {
		this.worldMap = worldMap;
	}

	calculate(individual) {
		const chromosome = individual.expressChromosome();
		// TODO walk on map
		// TODO read last position
		// TODO calculate distance from food
		// TODO calculate fitness
	}
}