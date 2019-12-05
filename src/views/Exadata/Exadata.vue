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
	<div class="container-fluid">
		<div class="row">
			<div class="col">
				<div class="row">
					<div class="col-4">
						<div class="card mb-3">
							<div class="card-body">
								<PatchStatusChart12 
									:patchedCount="data.count_patched_after_six_month" 
									:nonPatchedCount="data.count-data.count_patched_after_six_month"
									:widget="loaded"
									:spinner="loading"
									:error="errored">
								</PatchStatusChart12>
							</div>
						</div>
					</div>
					<div class="col-4">
						<div class="card mb-3">
							<div class="card-body">
								<PatchStatusChart6 
									:patchedCount="data.count_patched_after_twelve_month" 
									:nonPatchedCount="data.count-data.count_patched_after_twelve_month"
									:widget="loaded"
									:spinner="loading"
									:error="errored">
								</PatchStatusChart6>
							</div>
						</div>
					</div>
					<div class="col-4">
						<div class="card mb-3">
							<div class="card-body">
								<ErrorCountChart 
									:nonErroredCount="data.disks_count-data.failed_disks" 
									:erroredCount="data.failed_disks"
									:widget="loaded"
									:spinner="loading"
									:error="errored">
								</ErrorCountChart>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col">
				<b-card class="mb-3">
					<h6 slot="header" class="mb-0">
						<i class="fas fa-microchip"></i>
						CPU
					</h6>
					<div class="card-text">
						<span><strong>CPU</strong>: {{ data.used_cpu }}/{{ data.total_cpu }}</span>
					</div>
				</b-card>
			</div>
			<div class="col">
				<b-card class="mb-3">
					<h6 slot="header" class="mb-0">
						<i class="fas fa-memory"></i>
						Memory
					</h6>
					<div class="card-text">
						<span><strong>Memory</strong>: {{ data.memory }} GB</span>
					</div>
				</b-card>
			</div>
			<div class="col">
				<b-card class="mb-3">
					<h6 slot="header" class="mb-0">
						<i class="fas fa-hdd"></i>
						Storage
					</h6>
					<div class="card-text">
						<span><strong>Used perc</strong>: {{ data.used_cpu }} GB</span>
					</div>
				</b-card>
			</div>
		</div>
		<div class="row">
			<div v-for="exa in exadata" :key="exa.hostname" class="col col-4">
				<b-card class="mb-1">
					<h6 slot="header" class="mb-0">
						<i class="fas fa-server"></i>
							{{ exa.hostname }}
					</h6>
					<div>
						<b-card class="mb-1">
							<h6 slot="header" class="mb-0">
								<i class="fas fa-database"></i>
								DB Node
							</h6>
							<div class="col">
								<b-card v-for="dev in exa.DBServer" :key="dev.dev_hostname" class="card-text row">
									<span><strong>Hostname</strong>: {{ dev.dev_hostname }}</span><br />
									<span><strong>Model</strong>: {{ dev.dev_model }}</span><br />
									<span><strong>CPU</strong>: {{ dev.dev_cpu }}</span><br />
									<span><strong>Memory</strong>: {{ dev.dev_memory }}</span><br />
									<span><strong>Version</strong>: {{ dev.dev_version }}</span><br />
									<span><strong>Power Count</strong>: {{ dev.dev_power_count }}</span><br />
									<span><strong>Temp</strong>: {{ dev.dev_temp_actual }}</span><br />
								</b-card>
							</div>
						</b-card>
					</div>
					<div class="card-text">
						<b-card class="mb-1">
							<h6 slot="header" class="mb-0">
								<i class="fas fa-random"></i>
								IBSwitch
							</h6>
							<div class="col">
								<b-card v-for="dev in exa.IBSwitch" :key="dev.dev_hostname" class="card-text row">
									<span><strong>Hostname</strong>: {{ dev.dev_hostname }}</span><br />
									<span><strong>Model</strong>: {{ dev.dev_model }}</span><br />
									<span><strong>Version</strong>: {{ dev.dev_version }}</span><br />
								</b-card>
							</div>
						</b-card>
					</div>
					<div class="card-text">
						<b-card class="mb-1">
							<h6 slot="header" class="mb-0">
								<i class="fas fa-hdd"></i>
								Storage
							</h6>
							<div class="col">
								<b-card v-for="dev in exa.StorageServer" :key="dev.dev_hostname" class="card-text row">
									<span><strong>Hostname</strong>: {{ dev.dev_hostname }}</span><br />
									<span><strong>Model</strong>: {{ dev.dev_model }}</span><br />
									<span><strong>CPU</strong>: {{ dev.dev_cpu }}</span><br />
									<span><strong>Memory</strong>: {{ dev.dev_memory }}</span><br />
									<span><strong>Version</strong>: {{ dev.dev_version }}</span><br />
									<span><strong>Power Count</strong>: {{ dev.dev_power_count }}</span><br />
									<span><strong>Temp</strong>: {{ dev.dev_temp_actual }}</span><br />
								</b-card>
							</div>
						</b-card>
					</div>
				</b-card>
			</div>
		</div>
	</div>
</template>

<script>
import HostService from '@/services/HostService.js';
import PatchStatusChart12 from '@/components/exadata/PatchStatusChart12.vue';
import PatchStatusChart6 from '@/components/exadata/PatchStatusChart6.vue';
import ErrorCountChart from '@/components/exadata/ErrorCountChart.vue';

import DashboardService from '@/services/DashboardService';

export default {
	name: 'Exadata',
	components: {
		PatchStatusChart6,
		PatchStatusChart12,
		ErrorCountChart
	},
	data() {
		return {
			data: {},
			loaded: false,
			loading: true,
			errored: false,
			exadata: {},
		};
	},
	methods: {

	},
	created() {
		DashboardService.getExadataStats()
			.then(data => {
				this.data = data;
				this.loaded = true;
				this.loading = false;
				this.errored = false;
			})
			.catch(() => {
				this.$noty.error(`Unable to retrieve exadata stats`);
				this.loaded = true;
				this.loading = false;
				this.errored = true;
			});	
		DashboardService.getExadataDevices()
			.then(data => {
				this.exadata = data;
			})
			.catch(() => {
				this.$noty.error(`Unable to retrieve exadata devices`);
			});	
	}
};
</script>

<style scoped>
</style>
