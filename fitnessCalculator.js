class FitnessCalculator {
	constructor(worldMap) {
		this.worldMap = worldMap;
	}

	calculate(individual) {
		const mapWalker = new MapWalker(this.worldMap);
		mapWalker.walk(individual);
		const walkerPosition = mapWalker.getLastPosition();
		const distance = this.worldMap.calculateDistanceFromFood(walkerPosition);
		return this.fitnessFunction(distance / this.worldMap.getDiagonalLength());
	}

	fitnessFunction(x) {
		return 1.0 / (0.1 + x);
	}
}