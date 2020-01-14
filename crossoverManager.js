class CrossoverManager {
	constructor(individuals) {
		this.individuals = individuals;
	}

	exclusiveCrossover() {
		const twoBest = this.findTwoBest();
		const sizeToRecover = this.individuals.length;
		const newIndividuals = [];
		for(let i = 0; i < sizeToRecover; ++i) {
			const newInd = twoBest[0].crossWith(twoBest[1]);
			newIndividuals.push(newInd);
		}
		return newIndividuals;
	}

	findTwoBest() {
		let first = this.individuals[0];
		let second = this.individuals[1];
		if(first.getFitness() < second.getFitness()) {
			const tmp = first;
			first = second;
			second = tmp;
		}
		for(let i = 2; i < this.individuals.length; ++i) {
			const currentFitness = this.individuals[i].getFitness();
			if(currentFitness > first.getFitness()) {
				second = first;
				first = this.individuals[i];
			}
			else if(currentFitness > second.getFitness()) {
				second = this.individuals[i];
			}
		}
		return [first, second];
	}
}