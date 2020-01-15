class Position {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	distance(position) {
		const dx = position.x - this.x;
		const dy = position.y - this.y;
		return Math.sqrt(dx*dx + dy*dy);
	}

	translate(dx, dy) {
		this.x += dx;
		this.y += dy;
	}

	clone() {
		return new Position(this.x, this.y);
	}
}
