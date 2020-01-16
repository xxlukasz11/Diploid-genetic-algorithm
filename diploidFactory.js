class DiploidFactory {
	constructor(chromosomeLength) {
		const functionalGeneManager = new FunctionalGeneManager();
		const controlGeneManager = new ControlGeneManager();
		this.functionalChromosomeFactory = new ChromosomeFactory(chromosomeLength, functionalGeneManager);
		this.controlChromosomeFactory = new ChromosomeFactory(chromosomeLength, controlGeneManager);
	}

	updateChromosomeLength(chromosomeLength) {
		this.functionalChromosomeFactory.setChromosomeLength(chromosomeLength);
		this.controlChromosomeFactory.setChromosomeLength(chromosomeLength);
	}

	create() {
		const diploid = new Diploid(this.functionalChromosomeFactory, this.controlChromosomeFactory);
		return diploid;
	}
}