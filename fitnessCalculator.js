class FitnessCalculator {
	constructor(worldMap) {
		this.worldMap = worldMap;
	}

	calculate(individual) {
		const mapWalker = new MapWalker(this.worldMap, individual);
		mapWalker.walk();
		const walkerPosition = mapWalker.getLastPosition();
		const distance = this.worldMap.calculateDistanceFromFood(walkerPosition);
		const arg = distance / this.worldMap.getDiagonalLength();
		return this.computeFitnessValue(arg, mapWalker, individual);
	}

	computeFitnessValue(arg, mapWalker, individual) {
		let fitnessValue = this.fitnessFunction(arg);
		const collisionCount = mapWalker.getCollisionCount();
		if(collisionCount > 0) {
			fitnessValue = this.penaltyFunction(fitnessValue, collisionCount);
		}
		else if(mapWalker.foundFood()) {
			fitnessValue = this.successFunction(mapWalker.getSuccessRatio());
			individual.setFoundFood();
		}
		return fitnessValue;
	}

	fitnessFunction(x) {
		return 1.0 / (0.1 + x);
	}

	successFunction(successRatio) {
		return 10 + 10*successRatio;
	}

	penaltyFunction(fitness, collisionCount) {
		let factor = 1.0;
		for(let i = 0; i < collisionCount; ++i) {
			factor *= 0.3;
		}
		return fitness*factor;
	}

}