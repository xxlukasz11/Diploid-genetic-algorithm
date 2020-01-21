class PathPainter {
	constructor(worldMap, context, lineWidth) {
		this.worldMap = worldMap;
		this.context = context;
		this.lineWidth = lineWidth;
	}

	draw(individual, color) {
		this.setupStyle(color);
		const mapWalker = new MapWalker(this.worldMap, individual);
		mapWalker.walk();
		const positions = mapWalker.getPositionBuffer();
		this.drawPath(positions);
	}

	setupStyle(color) {
		this.context.strokeStyle = color;
		this.context.lineWidth = this.lineWidth;
	}

	drawPath(positions) {
		this.context.beginPath();
		this.context.moveTo(positions[0].x, positions[0].y);
		for(let i = 1; i < positions.length; ++i) {
			this.context.lineTo(positions[i].x, positions[i].y);
			if(this.worldMap.foundFood(positions[i])) {
				break;
			}
		}
		this.context.stroke();
	}
}