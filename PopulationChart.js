class PopulationChart {
	constructor(context) {
		this.context = context;
		this.chart = null;
		this.haploidColor = "rgb(255, 99, 132)";
		this.diploidColor = "blue";
		this.initializeChart();
	}

	initializeChart() {
		this.chart = new Chart(this.context, {
			type: 'line',
			data: {
				labels: [],
				datasets: [
				{
					label: 'haploid',
					borderColor: this.haploidColor,
					data: []
				}, {
					label: 'diploid',
					borderColor: this.diploidColor,
					data: []
				}]
			},
			options: {}
		});
		this.chart.canvas.parentNode.style.height = '400px';
		this.chart.canvas.parentNode.style.width = '800px';
	}

	setData(haploidData, diploidData) {
		this.chart.data.labels = this.createLabels(haploidData.length);
		this.chart.data.datasets[0].data = haploidData;
		this.chart.data.datasets[1].data = diploidData;
	}

	addData(label, haploidData, diploidData) {
		this.chart.data.labels.push(label);
		this.chart.data.datasets[0].data.push(haploidData);
		this.chart.data.datasets[1].data.push(diploidData);
	}

	update() {
		this.chart.update(0);
	}

	createLabels(length) {
		let index = 0;
		const labels = new Array(length);
		while(index < length) {
			labels[index] = index.toString();
			++index;
		}
		return labels;
	}

	clear() {
		this.chart.data.labels = [];
		this.chart.data.datasets[0].data = [];
		this.chart.data.datasets[1].data = [];
	}
}