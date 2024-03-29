class WorldMap {
	constructor(width, height, context) {
		this.width = width;
		this.height = height;
		this.context = context;
		this.obstacles = [];
		this.food = null;
		this.startingPosition = new Position(0, 0);
		this.diagonalLength = Math.sqrt(width*width+height*height);
		this.moveLength = this.diagonalLength / 50.0;
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

	foundFood(position) {
		return this.food.isInside(position);
	}

	isInside(position) {
		return position.x < this.width
			&& position.x > 0
			&& position.y < this.height
			&& position.y > 0;
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
		return this.startingPosition.clone();
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