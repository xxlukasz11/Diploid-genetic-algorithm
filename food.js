class Food {
	constructor(x, y, r) {
		this.position = new Position(x, y);
		this.r = r;
		this.shape = new CircleShape(x, y, r, "red");
	}

	draw(context) {
		this.shape.draw(context);
	}

	distance(position) {
		const dist = this.position.distance(position);
		if(dist > this.r) {
			return dist - this.r;
		}
		else {
			return 0;
		}
	}
}