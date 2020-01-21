class Diploid extends Individual {
	constructor(functionalChromosomeFactory, controlChromosomeFactory) {
		super();
		this.functionalChromosomeFactory = functionalChromosomeFactory;
		this.controlChromosomeFactory = controlChromosomeFactory;
		this.leftChromosome = functionalChromosomeFactory.createRandomChromosome();
		this.rightChromosome = functionalChromosomeFactory.createRandomChromosome();
		this.controlChromosome = controlChromosomeFactory.createRandomChromosome();
		this.controlChromosome2 = controlChromosomeFactory.createRandomChromosome();
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
			this.controlChromosome2.mutate();
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
		newDiploid.controlChromosome2 = this.controlChromosome2.sectionCrossover(diploid.controlChromosome2, start, end);
		newDiploid.leftChromosome = this.leftChromosome.sectionCrossover(diploid.leftChromosome, start, end);
		newDiploid.rightChromosome = this.rightChromosome.sectionCrossover(diploid.rightChromosome, start, end);
		
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
			const controlGene2 = this.controlChromosome2.getGeneAt(i);
			const fGen1 = this.leftChromosome.getGeneAt(i);
			const fGen2 = this.rightChromosome.getGeneAt(i);
			if(controlGeneManager.isDominant(controlGene) || controlGeneManager.isDominant(controlGene2)) {
				finalChromosome.setGeneAt(i, (fGen1 > fGen2 ? fGen1 : fGen2));
			}
			else {
				finalChromosome.setGeneAt(i, (fGen1 > fGen2 ? fGen2 : fGen1));
			}
		}
		this.lastExpressed = finalChromosome;
		this.expressionIsValid = true;
	}
}