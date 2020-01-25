const width = 900;
const height = 500;
const canvas = document.getElementById('canvas');
canvas.width = width;
canvas.height = height;
const ctx = canvas.getContext('2d');

const ctxChart = document.getElementById('fitnessChart').getContext('2d');
const chart = new PopulationChart(ctxChart);

const hSuc1 = document.getElementById('haploidSuccessLabel1');
const hSuc2 = document.getElementById('haploidSuccessLabel2');
const dSuc1 = document.getElementById('diploidSuccessLabel1');
const dSuc2 = document.getElementById('diploidSuccessLabel2');
const hSum = document.getElementById('haploidSuccessSum');
const dSum = document.getElementById('diploidSuccessSum');

const chromosomeLength = 60;
const populationSize = 100;
const mutationRate = 0.05;
const cycleLength = 500;
const meanFitnessCycle = 10;

const mFactory = new WorldMapFactory(width, height, ctx);
const world = mFactory.createVersionOne();
const world2 = mFactory.createVersionTwo();

let pFactory = new PopulationFactory(populationSize, chromosomeLength, mutationRate, world);
let haploidPopulation = pFactory.createHaploidPopulation();
let diploidPopulation = pFactory.createDiploidPopulation();

const hCycle = new CycleManager(haploidPopulation, cycleLength, meanFitnessCycle);
const dCycle = new CycleManager(diploidPopulation, cycleLength, meanFitnessCycle);

let mapIndex = 0;
let hFound1 = 0;
let hFound2 = 0;
let dFound1 = 0;
let dFound2 = 0;

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

	if(hBest.getFoundFood()) {
		if(mapIndex%2 == 0) {
			hFound1++;
		}
		else {
			hFound2++;
		}
	}
	if(dBest.getFoundFood()) {
		if(mapIndex%2 == 0) {
			dFound1++;
		}
		else {
			dFound2++;
		}
	}
	hSum.innerHTML = (hFound1+hFound2) + "";
	dSum.innerHTML = (dFound1+dFound2) + "";
	hSuc1.innerHTML = hFound1 + "";
	hSuc2.innerHTML = hFound2 + "";
	dSuc1.innerHTML = dFound1 + "";
	dSuc2.innerHTML = dFound2 + "";
	
	console.log(mapIndex);
	mapIndex++;
	setTimeout(start, 100);
}
