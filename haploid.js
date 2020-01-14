class Haploid extends Individual {
	constructor(chromosomeFactory) {
		super();
		this.chromosomeFactory = chromosomeFactory;
		this.chromosome = chromosomeFactory.createRandomChromosome();
	}

	mutate(mutationRate) {
		const mutationPoint = Math.random();
		if(mutationPoint >= mutationRate) {
			this.chromosome.mutate();
		}
	}

	expressChromosome() {
		return this.chromosome;
	}
}