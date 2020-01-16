class Diploid extends Individual {
	constructor(functionalChromosomeFactory, controlChromosomeFactory) {
		super();
		this.functionalChromosomeFactory = functionalChromosomeFactory;
		this.controlChromosomeFactory = controlChromosomeFactory;
		this.leftChromosome = functionalChromosomeFactory.createRandomChromosome();
		this.rightChromosome = functionalChromosomeFactory.createRandomChromosome();
		this.controlChromosome = controlChromosomeFactory.createRandomChromosome();
		this.expressionIsValid = false;
		this.lastExpressed = null;
	}

	mutate(mutationRate) {
		const mutationPoint = Math.random();
		if(mutationPoint >= mutationRate) {
			this.expressionIsValid = false;
			this.leftChromosome.mutate();
			this.rightChromosome.mutate();
			this.controlChromosome.mutate();
		}
	}

	updateChromosomeLength(chromosomeLength) {
		this.leftChromosome.adjustLength(chromosomeLength);
		this.rightChromosome.adjustLength(chromosomeLength);
		this.controlChromosome.adjustLength(chromosomeLength);
	}

	crossWith(diploid) {
		let start = this.controlChromosome.getRandomIndex();
		let end = this.controlChromosome.getRandomIndex();
		if(start > end) {
			const tmp = start;
			start = end;
			end = tmp;
		}
		const newDiploid = new Diploid(this.functionalChromosomeFactory, this.controlChromosomeFactory);
		newDiploid.controlChromosome = this.controlChromosome.sectionCrossover(diploid.controlChromosome, start, end);
		if(Math.random() >= 0.5) {
			newDiploid.leftChromosome = this.leftChromosome.sectionCrossover(diploid.rightChromosome, start, end);
		}
		else {
			newDiploid.rightChromosome = this.rightChromosome.sectionCrossover(diploid.leftChromosome, start, end);
		}
		return newDiploid;
	}

	getChromosome() {
		if(!this.expressionIsValid) {
			this.expressChromosome();
		}
		return this.lastExpressed;
	}

	expressChromosome() {
		const controlGeneManager = this.controlChromosomeFactory.getGeneManager();
		const finalChromosome  = this.functionalChromosomeFactory.createEmptyChromosome();
		const chromosomeLength = finalChromosome.getLength();
		for(let i = 0; i < chromosomeLength; ++i) {
			const controlGene = this.controlChromosome.getGeneAt(i);
			if(controlGeneManager.isDominant(controlGene)) {
				finalChromosome.setGeneAt(i, this.leftChromosome.getGeneAt(i));
			}
			else {
				finalChromosome.setGeneAt(i, this.rightChromosome.getGeneAt(i));
			}
		}
		this.lastExpressed = finalChromosome;
		this.expressionIsValid = true;
	}
}