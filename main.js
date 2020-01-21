function start() {

const width = 900;
const height = 500;
const canvas = document.getElementById('canvas');
canvas.width = width;
canvas.height = height;
const ctx = canvas.getContext('2d');

const mFactory = new WorldMapFactory(width, height, ctx);
const world = mFactory.createVersionOne();
const world2 = mFactory.createVersionTwo();
world.draw();

let chromosomeLength = 20;
const populationSize = 200;
const mutationRate = 0.01;
let pFactory = new PopulationFactory(populationSize, chromosomeLength, mutationRate, world);

let haploidPopulation = pFactory.createHaploidPopulation();
let diploidPopulation = pFactory.createDiploidPopulation();

const cycleLength = 300;
const hCycle = new CycleManager(haploidPopulation, cycleLength);
const dCycle = new CycleManager(diploidPopulation, cycleLength);

let mapIndex = 0;
doCycle();

function doCycle() {
	if(mapIndex > 5) {
		return;
	}
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

	for(let length = 10; length <= 60; length += 10) {
		chromosomeLength = length;
		haploidPopulation.changeChromosomeLength(chromosomeLength);
		diploidPopulation.changeChromosomeLength(chromosomeLength);
		
		hCycle.start();
		dCycle.start();
	}
	const hBest = haploidPopulation.findBest();
	const dBest = diploidPopulation.findBest();

	const painter = new PathPainter(currentWorld, ctx, 2);
	painter.draw(hBest, "yellow");
	painter.draw(dBest, "blue");

	setTimeout(doCycle, 100);
}



} // function