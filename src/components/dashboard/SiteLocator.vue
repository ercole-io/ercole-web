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
		<h3>Site Locator</h3>
		<form class="form-inline">
			<select class="custom-select" name="" id="" v-model="selectedLocation" :disabled="disabled">
				<option :value="''">All</option>
				<option v-for="locationStr in locations" :key="locationStr">{{locationStr}}</option>
			</select>
		</form>
	</div>
</template>

<script>
import DashboardService from '@/services/DashboardService';

export default {
	data() {
		return {
			locations: []
		};
	},
	created() {
		DashboardService.getServerLocations()
			.then(locationsArray => {
				this.locations = locationsArray;
				this.selectedLocation = '*'; //  srota2@sorint.it's bad idea
			})
			.catch(() => {
				this.$noty.error('Unable to load location data.');
			});
	},
	computed: {
		disabled() {
			return this.$store.getters['dashboard/isUpdating'];
		},
		selectedLocation: {
			set: function(value) {
				this.$store.dispatch('dashboard/updateWidgets', value);
			},
			get: function() {
				return this.$store.getters['dashboard/location'];
			}
		}
	}
};
</script>

<style scoped>
</style>
