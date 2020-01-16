const width = 500;
const height = 500;
const canvas = document.getElementById('canvas');
canvas.width = width;
canvas.height = height;
const ctx = canvas.getContext('2d');
ctx.fillStyle = "green";
ctx.fillRect(0, 0, width, height);

const mFactory = new WorldMapFactory(width, height, ctx);
const world = mFactory.createVersionOne();
world.draw();

let chromosomeLength = 20;
const populationSize = 50;
const mutationRate = 0.01;
let pFactory = new PopulationFactory(populationSize, chromosomeLength, mutationRate, world);

let haploidPopulation = pFactory.createHaploidPopulation();
let diploidPopulation = pFactory.createDiploidPopulation();

const cycleLength = 5000;
const hCycle = new CycleManager(haploidPopulation, cycleLength);
const dCycle = new CycleManager(diploidPopulation, cycleLength);

for(let length = 10; length <= 40; length += 10) {
	chromosomeLength = length;
	haploidPopulation.changeChromosomeLength(chromosomeLength);
	diploidPopulation.changeChromosomeLength(chromosomeLength);
	hCycle.start();
	dCycle.start();
}

console.log(haploidPopulation);
console.log(diploidPopulation);

const hBest = haploidPopulation.findBest();
const dBest = diploidPopulation.findBest();
console.log(hBest);
console.log(dBest);

const painter = new PathPainter(world, ctx, 2);
painter.draw(hBest, "yellow");
painter.draw(dBest, "blue");