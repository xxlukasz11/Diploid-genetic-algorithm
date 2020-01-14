class ChromosomeFactory {
	constructor(chromosomeLength, geneManager) {
		this.chromosomeLength = chromosomeLength;
		this.geneManager = geneManager;
	}

	setChromosomeLength(length) {
		this.chromosomeLength = this.chromosomeLength;
	}

	createRandomChromosome() {
		const chromosome = new Chromosome(this.chromosomeLength, this.geneManager);
		chromosome.randomize();
		return chromosome;
	}

	createEmptyChromosome() {
		const chromosome = new Chromosome(this.chromosomeLength, this.geneManager);
		return chromosome;
	}

	getGeneManager() {
		return this.geneManager;
	}
}