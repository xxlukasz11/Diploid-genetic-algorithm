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

const chromosomeLength = 50;
const populationSize = 50;
const mutationRate = 0.02;
let pFactory = new PopulationFactory(populationSize, chromosomeLength, mutationRate, world);

let haploidPopulation = pFactory.createHaploidPopulation();
let diploidPopulation = pFactory.createDiploidPopulation();

const cycleLength = 10;
const hCycle = new CycleManager(haploidPopulation, cycleLength);
const dCycle = new CycleManager(diploidPopulation, cycleLength);
hCycle.start();
dCycle.start();

console.log(haploidPopulation);
console.log(diploidPopulation);

const hBest = haploidPopulation.findBest();
const dBest = diploidPopulation.findBest();
console.log(hBest);
console.log(dBest);

const painter = new PathPainter(world, ctx, 2);
painter.draw(hBest, "yellow");
painter.draw(dBest, "blue");