class CircleShape {
	constructor(x, y, r, color) {
		this.x = x;
		this.y = y;
		this.r = r;
		this.color = color;
	}

	draw(context) {
		context.fillStyle = this.color;
		context.beginPath();
		context.arc(this.x, this.y, this.r, 0, 2*Math.PI);
		context.fill();
	}
}