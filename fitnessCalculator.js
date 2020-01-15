class FitnessCalculator {
	constructor(worldMap) {
		this.worldMap = worldMap;
	}

	calculate(individual) {
		const mapWalker = new MapWalker(this.worldMap);
		mapWalker.walk(individual);
		const walkerPosition = mapWalker.getLastPosition();
		const distance = this.worldMap.calculateDistanceFromFood(walkerPosition);
		const arg = distance / this.worldMap.getDiagonalLength();
		return this.computeFitnessValue(arg, mapWalker.getCollisionCount());
	}

	computeFitnessValue(arg, collisionCount) {
		let fitnessValue = this.fitnessFunction(arg);
		if(collisionCount > 0) {
			fitnessValue = this.penaltyFunction(fitnessValue, collisionCount);
		}
		return fitnessValue;
	}

	fitnessFunction(x) {
		return 1.0 / (0.1 + x);
	}

	penaltyFunction(fitness, collisionCount) {
		let factor = 1.0;
		for(let i = 0; i < collisionCount; ++i) {
			factor *= 0.5;
		}
		return fitness*factor;
	}

}