class DiploidFactory {
	constructor(chromosomeLength) {
		const functionalGeneManager = new FunctionalGeneManager();
		const controlGeneManager = new ControlGeneManager();
		this.functionalChromosomeFactory = new ChromosomeFactory(chromosomeLength, functionalGeneManager);
		this.controlChromosomeFactory = new ChromosomeFactory(chromosomeLength, controlGeneManager);
	}

	create() {
		const diploid = new Diploid(this.functionalChromosomeFactory, this.controlChromosomeFactory);
		return diploid;
	}
}