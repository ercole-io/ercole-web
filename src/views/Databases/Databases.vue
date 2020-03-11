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
								<DataguardStatusChart :env="env"></DataguardStatusChart>
							</div>
						</div>
					</div>
					<div class="col-4">
						<div class="card mb-3">
							<div class="card-body">
								<RACStatusChart :env="env"></RACStatusChart>
							</div>
						</div>
					</div>
					<div class="col-4">
						<div class="card mb-3">
							<div class="card-body">
								<ArchiveLogStatusChart :env="env"></ArchiveLogStatusChart>
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
						<span><strong>Total thread used</strong>: {{ workTotal }}</span>
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
						<span><strong>Total memory size</strong>: {{ memorySizeTotal }} GB</span>
					</div>
				</b-card>
			</div>
			<div class="col">
				<b-card class="mb-3">
					<h6 slot="header" class="mb-0">
						<i class="fas fa-hdd"></i>
						Storage
					</h6>
					<div class="card-text row">
						<span><strong>Total segment size</strong>: {{ segmentsSizeTotal }} GB</span>
						<span><strong>Total Datafile size</strong>: {{ datafileSizeTotal }} GB</span>
					</div>
				</b-card>
			</div>
		</div>
		<div class="row">
			<div class="col">
				<h3>Databases</h3>
				<b-row align-v="center" class="mb-2">
					<b-col md="6" class="my-1">
						<b-form-group horizontal label="Filter" class="mb-0">
							<b-input-group >
								<b-form-input
									v-model.trim="filter"
									placeholder="Insert database name" />
								<b-input-group-append>
									<b-btn :disabled="!filter" @click="filter = ''">Clear</b-btn>
								</b-input-group-append>
							</b-input-group>
						</b-form-group>
					</b-col>
					<b-col>
						<div class="float-right d-inline-flex align-items-center">
							<div class="mr-3">
								Showing {{ displayed }} of {{ totalRows }} elements
							</div>
							<b-pagination size="md" class="mb-0" :total-rows="totalRows" v-model="currentPage" :per-page="perPage">
							</b-pagination>
						</div>
					</b-col>
				</b-row>
				<b-row>
					<b-col md="4" class="my-2">
						<b-form-group :label-cols="8"  horizontal label="Enviroments" class="mb-0">
							<b-form-select v-model="env" :options="envList" class="mb-3" />
						</b-form-group>
					</b-col>
				</b-row>
				<b-table
					ref="databasesTable"
					striped hover responsive small
					:busy.sync="isBusy"
					:items="itemsProvider"
					:fields="fields"
					:current-page="currentPage"
					:filter="filter"
					show-empty
					empty-text="No databases."
					empty-filtered-text="No databases, try to remove filter."
					:per-page="perPage" >
					<template slot="Hostname" slot-scope="data">
						<a href="#" @click="showDetail(data.item)">
							{{data.value}}
						</a>
					</template>
					<template slot="ArchiveLogStatus" slot-scope="data">
						<CheckMark2 :value="data.value"></CheckMark2>
					</template>
					<template slot="Dataguard" slot-scope="data">
						<CheckMark2 :value="data.value"></CheckMark2>
					</template>
					<template slot="RAC" slot-scope="data">
						<CheckMark2 :value="data.value"></CheckMark2>
					</template>
					<template slot="HA" slot-scope="data">
						<CheckMark2 :value="data.value"></CheckMark2>
					</template>
				</b-table>
			</div>
		</div>
	</div>
</template>

<script>
import HostService from '@/services/HostService.js';
import DataguardStatusChart from '@/components/databases/DataguardStatusChart.vue';
import RACStatusChart from '@/components/databases/RACStatusChart.vue';
import ArchiveLogStatusChart from '@/components/databases/ArchiveLogStatusChart.vue';
import DashboardService from '@/services/DashboardService';

export default {
	name: 'Databases',
	components: {
		DataguardStatusChart,
		RACStatusChart,
		ArchiveLogStatusChart
	},
	data() {
		return {
			segmentsSizeTotal: 0,
			memorySizeTotal: 0,
			datafileSizeTotal: 0,
			workTotal: 0,
			currentPage: 1,
			totalRows: 0,
			perPage: 5,
			displayed: 0,
			isBusy: false,
			filter: "",
			env: "",
			envList: [],
			fields: [
				{
					key: 'Name',
					label: 'DB Name'
				},
				{
					key: 'UniqueName',
					label: 'Unique name'
				},
				{
					key: 'Version',
					label: 'Database version'
				},
				{
					key: 'Hostname',
					label: 'Hostname',
					sortable: true
				},
				{
					key: 'Status',
					label: 'Status'
				},
				{
					key: 'Environment',
					label: 'Environment'
				},
				{
					key: 'Location',
					label: 'Location'	
				},
				{
					key: 'Charset',
					label: 'Charset'	
				},
				{
					key: 'BlockSize',
					label: 'Blocksize'	
				},
				{
					key: 'CPUCount',
					label: 'CPU Count'	
				},
				{
					key: 'Work',
					label: 'Work'	
				},
				{
					key: 'Memory',
					label: 'Memory used'	
				},
				{
					key: 'DatafileSize',
					label: 'Datafile GB'	
				},
				{
					key: 'SegmentsSize',
					label: 'Segment GB'	
				},
				{
					key: 'ArchiveLogStatus',
					label: 'Archivelog'	
				},
				{
					key: 'Dataguard',
					label: 'DR'	
				},
				{
					key: 'RAC',
					label: 'RAC'	
				},
				{
					key: 'HA',
					label: 'HA'	
				},
			]
		};
	},
	methods: {
		showDetail(item /*, index, event*/) {
			this.$router.push({ name: 'host_detail', params: { id: item.hostname } });
		},
		itemsProvider(ctx) {
			if (ctx.sortBy == null) {
				ctx.sortBy  = 'hostname'
			}
			return HostService.getDatabases(ctx.currentPage, ctx.sortBy + ',' + (ctx.sortDesc? 'desc' : 'asc'), ctx.filter, this.env)
				.then(data => {
					const items = data.Content;
					this.totalRows = data.Metadata.TotalElements;
					this.perPage = data.Size;
					this.displayed = items.length;
					return items || [];
				})
				.catch(() => {
					this.$noty.error('Unable to retrieve databases list.');
				});
		},
		updateEnvs() {
			HostService.getEnviroments()
				.then(items => {
					items.unshift('');
					this.envList = items || [];
				})
				.catch(() => {
					this.$noty.error('Unable to enviroments.');
				});
		}
	},
	created() {
		DashboardService.getTotalSegmentsSize(this.env)
			.then(data => {
				this.segmentsSizeTotal = data;
			})
			.catch(() => {
				this.$noty.error(`Unable to retrieve segmentsSizeTotal ${this.id}`);
			});
		DashboardService.getTotalDatafileSize(this.env)
			.then(data => {
				this.datafileSizeTotal = data;
			})
			.catch(() => {
				this.$noty.error(`Unable to retrieve datafileSizeTotal ${this.id}`);
			});
		DashboardService.getTotalMemorySize(this.env)
			.then(data => {
				this.memorySizeTotal = Math.round(data);
			})
			.catch(() => {
				this.$noty.error(`Unable to retrieve memorySizeTotal ${this.id}`);
			});	
		DashboardService.getTotalWork(this.env)
			.then(data => {
				this.workTotal = data;
			})
			.catch(() => {
				this.$noty.error(`Unable to retrieve workTotal ${this.id}`);
			});	
	},
	watch: {
		env() {
			this.$refs.databasesTable.refresh();
		}
	},
	mounted() {
		this.updateEnvs();
	}
};
</script>

<style scoped>
</style>
