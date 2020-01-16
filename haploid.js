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

	updateChromosomeLength(chromosomeLength) {
		this.chromosome.adjustLength(chromosomeLength);
	}

	getChromosome() {
		return this.chromosome;
	}

	crossWith(haploid) {
		let start = this.chromosome.getRandomIndex();
		let end = this.chromosome.getRandomIndex();
		if(start > end) {
			const tmp = start;
			start = end;
			end = tmp;
		}
		const newChromosome = this.chromosome.sectionCrossover(haploid.getChromosome(), start, end);
		const newHaploid = new Haploid(this.chromosomeFactory);
		newHaploid.chromosome = newChromosome;
		return newHaploid;
	}
}