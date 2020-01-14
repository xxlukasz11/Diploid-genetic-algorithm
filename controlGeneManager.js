class ControlGeneManager {
	constructor() {
		this.dominant = 1;
		this.recesive = 0;
	}

	randomGene() {
		if(Math.random() >= 0.5) {
			return this.dominant;
		}
		return this.recesive;
	}

	isDominant(gene) {
		return gene == this.dominant;
	}

	isRecesive(gene) {
		return gene == this.recesive;
	}
}