class WorldMap {
	constructor(width, height) {
		this.width = width;
		this.height = height;
		this.obstacles = [];
		this.food = null;
		this.context = null;
	}

	setContext(context) {
		this.context = context;
	}

	addObstacle(obstacle) {
		this.obstacles.push(obstacle);
	}

	setFood(food) {
		this.food = food;
	}

	collidesWithObstacle(position) {
		for(let obstacle of this.obstacles) {
			if(obstacle.isInside(position))
				return true;
		}
		return false;
	}

	draw() {
		for(let obstacle of this.obstacles) {
			obstacle.draw(this.context);
		}
		if(this.food) {
			this.food.draw(this.context);
		}
	}

}