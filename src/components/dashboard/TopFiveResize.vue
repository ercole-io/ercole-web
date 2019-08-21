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
		<h4>Top 10 instance resource unused</h4>
		<b-table bordered :items="data" :fields="fields" v-if="widget" show-empty empty-text="No data.">
			<template slot="position" slot-scope="data">
      	{{data.index + 1}}
    	</template>
		</b-table>
		<vue-simple-spinner v-if="spinner" size="big" message="Loading..."></vue-simple-spinner>
		<b-alert :show="alert" variant="danger">
			Unable to load data.
		</b-alert>
	</div>
</template>

<script>
export default {
	computed: {
		data() {
			const data = this.$store.getters['dashboard/topFiveResize/data'];
			return JSON.parse(JSON.stringify(data));
		},
		spinner() {
			return this.$store.getters['dashboard/topFiveResize/spinner'];
		},
		widget() {
			return this.$store.getters['dashboard/topFiveResize/widget'];
		},
		alert() {
			return this.$store.getters['dashboard/topFiveResize/alert'];
		}
	},
	data() {
		return {
			fields: [
				{ key: 'position', label: '#' },
				{ key: 'hostname', label: 'Hostname' },
				{ key: 'resize', label: 'Unused thread' }
			]
		};
	}
};
</script>

<style scoped>
</style>
