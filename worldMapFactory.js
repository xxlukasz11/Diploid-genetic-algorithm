class WorldMapFactory {
	constructor(width, height, context) {
		this.width = width;
		this.height = height;
		this.context = context;
	}

	createVersionOne() {
		const topObstacle = new CircleObstacle(this.width*0.45, this.height*0.3, this.height*0.2);
		const bottomObstacle = new RectangeObstacle(this.width*0.65, this.height*0.55, this.width*0.1, this.height*0.3);
		const food = new Food(this.width*0.85, this.height*0.7, this.height/50);
		const startingPosition = new Position(this.width*0.1, this.height*0.1);

		return this.create(food, startingPosition, [topObstacle, bottomObstacle]);
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