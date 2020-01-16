class HaploidFactory {
	constructor(chromsomeLength) {
		const geneManager = new FunctionalGeneManager();
		this.chromosomeFactory = new ChromosomeFactory(chromsomeLength, geneManager);
	}

	updateChromosomeLength(chromosomeLength) {
		this.chromosomeFactory.setChromosomeLength(chromosomeLength);
	}

	create() {
		const haploid = new Haploid(this.chromosomeFactory);
		return haploid;
	}
}