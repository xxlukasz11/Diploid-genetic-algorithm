class MapWalker {
	constructor(worldMap, individual) {
		this.worldMap = worldMap;
		this.individual = individual;
		this.moveLength = worldMap.getMoveLength();
		this.currentPosition = worldMap.getStartingPosition();
		this.collisionCount = 0;
		this.positionBuffer = [this.currentPosition.clone()];
	}

	walk() {
		const chromosome = this.individual.getChromosome();
		let direction = this.decodeInitialDirection(chromosome);

		const chromosomeLength = chromosome.getLength();
		for(let i = 1; i < chromosomeLength; ++i) {
			direction += this.decodeDirectionChange(chromosome, i);
			const radDir = this.toRadians(direction);
			const dx = this.moveLength*Math.cos(radDir);
			const dy = this.moveLength*Math.sin(radDir);
			this.currentPosition.translate(dx, dy);
			this.positionBuffer.push(this.currentPosition.clone());

			if(this.worldMap.collidesWithObstacle(this.currentPosition) || !this.worldMap.isInside(this.currentPosition)) {
				this.collisionCount++;
			}
		}
	}

	getPositionBuffer() {
		return this.positionBuffer;
	}

	getCollisionCount() {
		return this.collisionCount;
	}

	toRadians(degree) {
		return degree * Math.PI / 180.0;
	}

	getLastPosition() {
		return this.currentPosition;
	}

	decodeInitialDirection(chromosome) {
		const delta = 360.0 / chromosome.getNoOfGenes();
		return delta*chromosome.getGeneAt(0);
	}

	decodeDirectionChange(chromosome, i) {
		const delta = 180.0 / (chromosome.getNoOfGenes() - 1);
		const angle = delta*chromosome.getGeneAt(i);
		return 90.0 - angle;
	}
}