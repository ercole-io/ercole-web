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
		<h4>Licence Compliance</h4>
		<div v-if="widget">
			<i class="fas fa-globe fa-3x" style="position: absolute; right: 40px; top:60px"></i>
			<router-link to="licenses" class="mt-3">
				<h3 v-if="status.Compliance" class="text-success">
					<i class="fas fa-thumbs-up"></i> OK
				</h3>
				<h3 v-else class="text-danger">
					<i class="fas fa-thumbs-down"></i> NOT OK
				</h3>
			</router-link>
			<div class="mt-1">
				<strong>{{ status.Licenses.free }}</strong>/{{ status.Licenses.used }}
			</div>
		</div>

		<vue-simple-spinner v-if="spinner" size="big" message="Loading..."></vue-simple-spinner>
		<b-alert :show="alert" variant="danger">
			Unable to load data.
		</b-alert>
	</div>
</template>

<script>
import DashboardService from '@/services/DashboardService';

export default {
	created() {
		this.spinner = true;
		this.widget = false;
		DashboardService.getLicensesCompliance()
			.then(data => {
				this.status = data;
				this.spinner = false;
				this.widget = true;
			})
			.catch(() => {
				this.spinner = false;
				this.alert = true;
			});
	},
	methods: {
		openDetailPage() {
			this.$router.push({
				name: 'licenses'
			});
		}
	},
	data() {
		return {
			alert: false,
			spinner: false,
			widget: false,
			status: {
				Compliance: false,
				Licenses: {
					used: 0,
					free: 0
				}
			}
		};
	}
};
</script>

<style scoped>
</style>
