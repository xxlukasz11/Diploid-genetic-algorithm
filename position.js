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
}
