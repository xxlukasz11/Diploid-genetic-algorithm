class WorldMap {
	constructor(width, height) {
		this.width = width;
		this.height = height;
		this.obstacles = [];
		this.food = null;
		this.context = null;
		this.startingPosition = new Position(0, 0);
		this.diagonalLength = Math.sqrt(width*width+height*height);
		this.moveLength = this.diagonalLength / 100.0;
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

	getStartingPosition() {
		return this.startingPosition;
	}

	setStartingPosition(position) {
		this.startingPosition = position;
	}

	getDiagonalLength() {
		return this.diagonalLength;
	}

	calculateDistanceFromFood(position) {
		return this.food.distance(position);
	}

	getMoveLength() {
		return this.moveLength;
	}

	setMoveLength(length) {
		this.moveLength = length;
	}

}