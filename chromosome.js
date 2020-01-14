class Chromosome {
	constructor(length, geneManager) {
		this.length = length;
		this.geneManager = geneManager;
		this.genes = new Array(length);
	}

	randomize() {
		for(let i = 0; i < this.length; ++i) {
			this.genes[i] = this.geneManager.randomGene();
		}
	}

	getLength() {
		return this.length;
	}

	getGeneAt(index) {
		return this.genes[index];
	}

	setGeneAt(index, gene) {
		this.genes[index] = gene;
	}

	mutate() {
		const randomIndex = Math.floor(Math.random()*this.length);
		this.genes[randomIndex] = this.geneManager.randomGene();
	}
}