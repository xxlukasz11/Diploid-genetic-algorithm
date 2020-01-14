class CircleObstacle {
	constructor(x, y, r) {
		this.center = new Position(x, y);
		this.r = r;
		this.shape = new CircleShape(x, y, r, "black");
	}

	draw(context) {
		this.shape.draw(context);
	}

	isInside(position) {
		return this.center.distance(position) < this.r;
	}
}
