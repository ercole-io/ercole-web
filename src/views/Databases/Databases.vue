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
								<DataguardStatusChart></DataguardStatusChart>
							</div>
						</div>
					</div>
					<div class="col-4">
						<div class="card mb-3">
							<div class="card-body">
								<RACStatusChart></RACStatusChart>
							</div>
						</div>
					</div>
					<div class="col-4">
						<div class="card mb-3">
							<div class="card-body">
								<ArchiveLogStatusChart></ArchiveLogStatusChart>
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
					<template slot="hostname" slot-scope="data">
						<a href="#" @click="showDetail(data.item)">
							{{data.value}}
						</a>
					</template>
					<template slot="archive_log_status" slot-scope="data">
						<CheckMark2 :value="data.value"></CheckMark2>
					</template>
					<template slot="dataguard" slot-scope="data">
						<CheckMark2 :value="data.value"></CheckMark2>
					</template>
					<template slot="rac" slot-scope="data">
						<CheckMark2 :value="data.value"></CheckMark2>
					</template>
					<template slot="ha" slot-scope="data">
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
			fields: [
				{
					key: 'dbname',
					label: 'DB Name'
				},
				{
					key: 'unique_name',
					label: 'Unique name'
				},
				{
					key: 'dbver',
					label: 'Version'
				},
				{
					key: 'hostname',
					label: 'Hostname',
					sortable: true
				},
				{
					key: 'status',
					label: 'Status'
				},
				{
					key: 'environment',
					label: 'Environment'
				},
				{
					key: 'location',
					label: 'Location'	
				},
				{
					key: 'charset',
					label: 'Charset'	
				},
				{
					key: 'block_size',
					label: 'Blocksize'	
				},
				{
					key: 'cpu_count',
					label: 'CPU Count'	
				},
				{
					key: 'work',
					label: 'Work'	
				},
				{
					key: 'memory',
					label: 'Memory used'	
				},
				{
					key: 'datafile_size',
					label: 'Datafile GB'	
				},
				{
					key: 'segments_size',
					label: 'Segment GB'	
				},
				{
					key: 'archive_log_status',
					label: 'Archivelog'	
				},
				{
					key: 'dataguard',
					label: 'DR'	
				},
				{
					key: 'rac',
					label: 'RAC'	
				},
				{
					key: 'ha',
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
			return HostService.getDatabases(ctx.currentPage, ctx.sortBy + ',' + (ctx.sortDesc? 'desc' : 'asc'), ctx.filter)
				.then(dbs => {
					const items = dbs.content;
					this.totalRows = dbs.numberOfElements;
					this.perPage = dbs.size;
					this.displayed = items.length;
					return items || [];
				})
				.catch(() => {
					this.$noty.error('Unable to retrieve databases list.');
				});
		}
	},
	created() {
		DashboardService.getTotalSegmentsSize()
			.then(data => {
				this.segmentsSizeTotal = data;
			})
			.catch(() => {
				this.$noty.error(`Unable to retrieve segmentsSizeTotal ${this.id}`);
			});
		DashboardService.getTotalDatafileSize()
			.then(data => {
				this.datafileSizeTotal = data;
			})
			.catch(() => {
				this.$noty.error(`Unable to retrieve datafileSizeTotal ${this.id}`);
			});
		DashboardService.getTotalMemorySize()
			.then(data => {
				this.memorySizeTotal = Math.round(data);
			})
			.catch(() => {
				this.$noty.error(`Unable to retrieve memorySizeTotal ${this.id}`);
			});	
		DashboardService.getTotalWork()
			.then(data => {
				this.workTotal = data;
			})
			.catch(() => {
				this.$noty.error(`Unable to retrieve workTotal ${this.id}`);
			});	
	},
	watch: {
		olderThan() {
			this.$refs.databasesTable.refresh();
		}
	}
};
</script>

<style scoped>
</style>
