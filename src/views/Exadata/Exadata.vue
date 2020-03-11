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
								<PatchStatusChart :windowTime=12>
								</PatchStatusChart>
							</div>
						</div>
					</div>
					<div class="col-4">
						<div class="card mb-3">
							<div class="card-body">
								<PatchStatusChart :windowTime=6>
								</PatchStatusChart>
							</div>
						</div>
					</div>
					<div class="col-4">
						<div class="card mb-3">
							<div class="card-body">
								<ErrorCountChart>
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
						<span><strong>CPU</strong>: {{ totalCpu.Enabled }}/{{ totalCpu.Total }}</span>
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
						<span><strong>Memory</strong>: {{ totalMemory }} GB</span>
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
						<span><strong>Used perc</strong>: {{ avgStorageUsage }}%</span>
					</div>
				</b-card>
			</div>
		</div>
		<div class="row">
			<div v-for="exa in exadata" :key="exa.Hostname" class="col col-4">
				<b-card class="mb-1">
					<h6 slot="header" class="mb-0">
						<i class="fas fa-server"></i>
							{{ exa.Hostname }}
					</h6>
					<div>
						<b-card class="mb-1">
							<h6 slot="header" class="mb-0">
								<i class="fas fa-database"></i>
								DB Node
							</h6>
							<div class="col">
								<b-card v-for="dev in exa.DBServers" :key="dev.Hostname" class="card-text row">
									<span><strong>Hostname</strong>: {{ dev.Hostname }}</span><br />
									<span><strong>Model</strong>: {{ dev.Model }}</span><br />
									<span><strong>CPU</strong>: {{ dev.CPUEnabled }}</span><br />
									<span><strong>Memory</strong>: {{ dev.Memory }}</span><br />
									<span><strong>Version</strong>: {{ dev.ExaSwVersion }}</span><br />
									<span><strong>Power Count</strong>: {{ dev.PowerCount }}</span><br />
									<span><strong>Temp</strong>: {{ dev.TempActual }}</span><br />
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
								<b-card v-for="dev in exa.IBSwitches" :key="dev.Hostname" class="card-text row">
									<span><strong>Hostname</strong>: {{ dev.Hostname }}</span><br />
									<span><strong>Model</strong>: {{ dev.Model }}</span><br />
									<span><strong>Version</strong>: {{ dev.ExaSwVersion }}</span><br />
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
								<b-card v-for="dev in exa.StorageServers" :key="dev.Hostname" class="card-text row">
									<span><strong>Hostname</strong>: {{ dev.Hostname }}</span><br />
									<span><strong>Model</strong>: {{ dev.Model }}</span><br />
									<span><strong>CPU</strong>: {{ dev.CPUEnabled }}</span><br />
									<span><strong>Memory</strong>: {{ dev.Memory }}</span><br />
									<span><strong>Version</strong>: {{ dev.ExaSwVersion }}</span><br />
									<span><strong>Power Count</strong>: {{ dev.PowerCount }}</span><br />
									<span><strong>Temp</strong>: {{ dev.TempActual }}</span><br />
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
import PatchStatusChart from '@/components/exadata/PatchStatusChart.vue';
import ErrorCountChart from '@/components/exadata/ErrorCountChart.vue';

import DashboardService from '@/services/DashboardService';

export default {
	name: 'Exadata',
	components: {
		PatchStatusChart,
		ErrorCountChart
	},
	data() {
		return {
			exadata: {},
			totalCpu: {},
			totalMemory: 0,
			avgStorageUsage: 0
		};
	},
	methods: {

	},
	created() {
		DashboardService.getExadataTotalCPUStats()
			.then(data => {
				this.totalCpu = data;
			})
			.catch(() => {
				this.$noty.error(`Unable to retrieve exadata total cpu stats`);
			});	
		DashboardService.getExadataTotalMemorySizeStats()
			.then(data => {
				this.totalMemory = data;
			})
			.catch(() => {
				this.$noty.error(`Unable to retrieve exadata total memory stats`);
			});	
		DashboardService.getExadataAverageStorageUsageStats()
			.then(data => {
				this.avgStorageUsage = data;
			})
			.catch(() => {
				this.$noty.error(`Unable to retrieve exadata average storage usage stats`);
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
