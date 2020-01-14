const width = 500;
const height = 500;
const canvas = document.getElementById('canvas');
canvas.width = width;
canvas.height = height;
const ctx = canvas.getContext('2d');
ctx.fillStyle = "green";
ctx.fillRect(0, 0, width, height);

const world = new WorldMap(width, height);
world.setContext(ctx);
world.addObstacle(new CircleObstacle(50, 50, 20));
world.setFood(new Food(200, 200, 10));
world.draw();

const chromosomeLength = 10;
const populationSize = 3;
const mutationRate = 0.05;
let pFactory = new PopulationFactory(populationSize, chromosomeLength, mutationRate, world);

let haploidPopulation = pFactory.createHaploidPopulation();
let diploidPopulation = pFactory.createDiploidPopulation();

console.log(haploidPopulation);
console.log(diploidPopulation);

const cycleLength = 2;
const cycle = new CycleManager(diploidPopulation, cycleLength);
cycle.start();
