class WorldMapFactory {
	constructor(width, height, context) {
		this.width = width;
		this.height = height;
		this.context = context;
	}

	createVersionOne() {
		const centerObstacle = new CircleObstacle(this.width/2, this.height/2, this.height/5);
		const food = new Food(this.width*0.9, this.height*0.9, this.height/50);
		const startingPosition = new Position(this.width*0.1, this.height*0.1);

		return this.create(food, startingPosition, [centerObstacle]);
	}
	
	create(food, startingPosition, obstacles) {
		const map = new WorldMap(this.width, this.height, this.context);
		map.setFood(food);
		map.setStartingPosition(startingPosition);
		if(obstacles) {
			for(let obstacle of obstacles) {
				map.addObstacle(obstacle);
			}
		}
		return map;
	}
}