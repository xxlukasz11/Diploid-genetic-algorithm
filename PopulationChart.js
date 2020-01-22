class PopulationChart {
	constructor(context) {
		this.context = context;
		this.chart = null;
		this.haploidColor = "rgb(255, 99, 132)";
		this.diploidColor = "blue";
		this.initializeChart();
		this.hMeanData = [];
		this.dMeanData = [];
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
		this.hMeanData.push(haploidData);
		this.dMeanData.push(diploidData);
		this.chart.data.datasets[0].data = this.meanHaploidArray();
		this.chart.data.datasets[1].data = this.meanDiploidArray();
	}

	meanHaploidArray() {
		const meanArray = new Array(this.hMeanData[0].length);
		for(let i = 0; i < meanArray.length; ++i) {
			meanArray[i]  = 0.0;
		}
		for(let array of this.hMeanData) {
			for(let i = 0; i < array.length; ++i) {
				meanArray[i] += array[i];
			}
		}
		for(let i = 0; i < meanArray.length; ++i) {
			meanArray[i] /= this.hMeanData.length;
		}
		return meanArray;
	}

	meanDiploidArray() {
		const meanArray = new Array(this.dMeanData[0].length);
		for(let i = 0; i < meanArray.length; ++i) {
			meanArray[i]  = 0.0;
		}
		for(let array of this.dMeanData) {
			for(let i = 0; i < array.length; ++i) {
				meanArray[i] += array[i];
			}
		}
		for(let i = 0; i < meanArray.length; ++i) {
			meanArray[i] /= this.dMeanData.length;
		}
		return meanArray;
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