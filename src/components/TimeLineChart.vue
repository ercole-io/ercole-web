<!--
Copyright (c) 2019 Sorint.lab S.p.A.

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
-->

<script>
import { mixins, Line } from 'vue-chartjs';
const { reactiveProp } = mixins;

export default {
	extends: Line,
	props: ['chartData', 'height', 'suggestedMax'],
	mixins: [reactiveProp],
	mounted() {	
		this.render();
	},
	methods: {
		render() {
			// this._chart.destroy();
			this.renderChart(this.chartData, {
				responsive: true,
				title: {
					display: false,
				},
				scales: {
					xAxes: [{
						type: 'time',
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'Date'
						},
						ticks: {
							major: {
								fontStyle: 'bold',
								fontColor: '#FF0000'
							}
						},
						time: {
							stepSize: 1,
							minUnit: 'day'
						}
					}],
					yAxes: [{
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'Size'
						},
						ticks: {
							beginAtZero: true,
							suggestedMax: this.suggestedMax,
						}
					}]
				}
			});
		}
	}, 
	watch: {
		chartData() {
			this.render();
		}
	}
}
</script>