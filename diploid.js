class Diploid extends Individual {
	constructor(functionalChromosomeFactory, controlChromosomeFactory) {
		super();
		this.functionalChromosomeFactory = functionalChromosomeFactory;
		this.controlChromosomeFactory = controlChromosomeFactory;
		this.leftChromosome = functionalChromosomeFactory.createRandomChromosome();
		this.rightChromosome = functionalChromosomeFactory.createRandomChromosome();
		this.controlChromosome = controlChromosomeFactory.createRandomChromosome();
	}

	mutate(mutationRate) {
		const mutationPoint = Math.random();
		if(mutationPoint >= mutationRate) {
			this.leftChromosome.mutate();
			this.rightChromosome.mutate();
			this.controlChromosome.mutate();
		}
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
		return finalChromosome;
	}
}