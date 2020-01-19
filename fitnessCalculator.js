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
		return this.computeFitnessValue(arg, mapWalker);
	}

	computeFitnessValue(arg, mapWalker) {
		let fitnessValue = this.fitnessFunction(arg);
		const collisionCount = mapWalker.getCollisionCount();
		if(collisionCount > 0) {
			fitnessValue = this.penaltyFunction(fitnessValue, collisionCount);
		}
		else {
			if(mapWalker.foundFood()) {
				fitnessValue = this.success_function(fitnessValue, mapWalker.getSuccessCount())
			}
		}
		return fitnessValue;
	}

	fitnessFunction(x) {
		return 1.0 / (0.1 + x);
	}

	success_function(fitness, successCount) {
		let factor = 1.0;
		for(let i = 0; i < successCount; ++i) {
			factor *= 1.1;
		}
		return fitness*factor;
	}

	penaltyFunction(fitness, collisionCount) {
		let factor = 1.0;
		for(let i = 0; i < collisionCount; ++i) {
			factor *= 0.5;
		}
		return fitness*factor;
	}

}