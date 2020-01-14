class MapWalker {
	constructor(worldMap) {
		this.worldMap = worldMap;
		this.moveLength = worldMap.getMoveLength();
		this.currentPosition = worldMap.getStartingPosition();
	}

	walk(individual) {
		const chromosome = individual.getChromosome();
		let direction = this.decodeInitialDirection(chromosome);

		const chromosomeLength = chromosome.getLength();
		for(let i = 1; i < chromosomeLength; ++i) {
			direction += this.decodeDirectionChange(chromosome, i);
			const radDir = this.toRadians(direction);
			const dx = this.moveLength*Math.cos(radDir);
			const dy = this.moveLength*Math.sin(radDir);
			this.currentPosition.translate(dx, dy);
		}
	}

	toRadians(degree) {
		return Math.PI / 180.0;
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