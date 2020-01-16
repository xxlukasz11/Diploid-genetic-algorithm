class RectangeObstacle {
	constructor(x, y, w, h) {
		this.topLeft = new Position(x, y);
		this.bottomRight = new Position(x + w, y + h);
		this.shape = new RectangleShape(x, y, w, h, "black");
	}

	draw(context) {
		this.shape.draw(context);
	}

	isInside(position) {
		return position.x > this.topLeft.x
			&& position.x < this.bottomRight.x
			&& position.y > this.topLeft.y
			&& position.y < this.bottomRight.y;
	}
}
