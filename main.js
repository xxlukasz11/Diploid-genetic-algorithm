const width = 900;
const height = 500;
const canvas = document.getElementById('canvas');
canvas.width = width;
canvas.height = height;
const ctx = canvas.getContext('2d');

const ctxChart = document.getElementById('fitnessChart').getContext('2d');
const chart = new PopulationChart(ctxChart);

const mFactory = new WorldMapFactory(width, height, ctx);
const world = mFactory.createVersionOne();
const world2 = mFactory.createVersionTwo();

let chromosomeLength = 60;
const populationSize = 100;
const mutationRate = 0.01;
let pFactory = new PopulationFactory(populationSize, chromosomeLength, mutationRate, world);

let haploidPopulation = pFactory.createHaploidPopulation();
let diploidPopulation = pFactory.createDiploidPopulation();

const cycleLength = 100;
const meanFitnessCycle = 10;
const hCycle = new CycleManager(haploidPopulation, cycleLength, meanFitnessCycle);
const dCycle = new CycleManager(diploidPopulation, cycleLength, meanFitnessCycle);

let mapIndex = 0;

function start() {
	let currentWorld;
	if(mapIndex%2 == 0) {
		currentWorld = world;
	}
	else {
		currentWorld = world2;
	}
	haploidPopulation.setWorldMap(currentWorld);
	diploidPopulation.setWorldMap(currentWorld);
	ctx.fillStyle = "green";
	ctx.fillRect(0, 0, width, height);
	currentWorld.draw();
	mapIndex++;

	hCycle.clearFitnessArray();
	dCycle.clearFitnessArray();
	haploidPopulation.changeChromosomeLength(chromosomeLength);
	diploidPopulation.changeChromosomeLength(chromosomeLength);
		
	hCycle.start();
	dCycle.start();
	const hBest = haploidPopulation.findBest();
	const dBest = diploidPopulation.findBest();

	const painter = new PathPainter(currentWorld, ctx, 2);
	painter.draw(hBest, "yellow");
	painter.draw(dBest, "blue");

	const hData = hCycle.getFitnessArray();
	const dData = dCycle.getFitnessArray();
	chart.setData(hData, dData);
	chart.update();
	setTimeout(start, 100);
}
