class FunctionalGeneManager {
	constructor() {
		this.minValue = 1;
		this.maxValue = 5;
		this.geneRange = this.maxValue - this.minValue + 1;
	}

	randomGene() {
		return Math.floor(Math.random()*this.geneRange) + this.minValue;
	}
}