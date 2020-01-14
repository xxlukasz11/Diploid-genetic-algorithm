class Food {
	constructor(x, y, r) {
		this.position = new Position(x, y);
		this.shape = new CircleShape(x, y, r, "red");
	}

	draw(context) {
		this.shape.draw(context);
	}

	getPosition() {
		return this.position;
	}
}