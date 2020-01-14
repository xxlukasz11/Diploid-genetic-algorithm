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

	sectionCrossover(chromosome, start, end) {
		const newGenes = [];
		for(let i = 0; i < this.length; ++i) {
			if(i <= start || i > end) {
				newGenes.push(this.genes[i]);
			}
			else {
				newGenes.push(chromosome.genes[i]);
			}
		}
		const newChromosome = new Chromosome(this.length, this.geneManager);
		newChromosome.genes = newGenes;
		return newChromosome;
	}

	getRandomIndex() {
		return Math.floor(Math.random()*this.length);
	}
}