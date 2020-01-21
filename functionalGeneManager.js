class FunctionalGeneManager {
	constructor() {
		this.minValue = 0;
		this.maxValue = 7;
		this.geneRange = this.maxValue - this.minValue + 1;
	}

	randomGene() {
		return Math.floor(Math.random()*this.geneRange) + this.minValue;
	}

	getNoOfGenes() {
		return this.geneRange;
	}
}