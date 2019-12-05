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

<template>
	<div>
		<h4>Error count</h4>
		<PieChart :height="300" :chart-data="data" v-if="widget"></PieChart>
		<vue-simple-spinner v-if="spinner" size="big" message="Loading..."></vue-simple-spinner>
		<b-alert :show="alert" variant="danger">
			Unable to load data.
		</b-alert>
	</div>
</template>

<script>
import DashboardService from '@/services/DashboardService';
import { mapArrayToPieChartData } from '@/utils/PieChartMapper';

export default {
	props: {
		widget: Boolean,
		spinner: Boolean,
		alert: Boolean,
		erroredCount: {
			type: Number
		},
		nonErroredCount: {
			type: Number
		},
	},
	computed: {
		data() {
			let data = mapArrayToPieChartData([
					{ "errored": false, "count": this.nonErroredCount},
					{ "errored": true, "count": this.erroredCount},
				], ['errored', 'count']);
			data.labels.forEach(function (item, index) {
				if (item == false) {
					data.datasets[0].backgroundColor[index] = '#8BC34A';
				} else if  (item == true) {
					data.datasets[0].backgroundColor[index] = '#ff0000';
				}
			})

			return data
		}
	}
};
</script>

<style scoped>
</style>
