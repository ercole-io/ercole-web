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
				<h3>Hosts</h3>
				<b-row align-v="center" class="mb-2">
					<b-col md="6" class="my-1">
						<b-form-group horizontal label="Filter" class="mb-0">
							<b-input-group >
								<b-form-input
									v-model.trim="filter"
									placeholder="Insert host name or database name" />
								<b-input-group-append>
									<b-btn :disabled="!filter" @click="filter = ''">Clear</b-btn>
								</b-input-group-append>
							</b-input-group>
						</b-form-group>
					</b-col>
					<b-button @click="generate()" :disabled="loading" class="lg">
						Generate xls
					</b-button>
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
					<b-col md="4" class="my-1">
						<b-form-group :label-cols="8"  horizontal label="Last update more than (days)" class="mb-0">
							<b-form-select v-model="olderThan" :options="options" class="mb-3" />
						</b-form-group>
					</b-col>
				</b-row>
				<b-table
					ref="hostsTable"
					striped hover responsive small
					:busy.sync="isBusy"
					:filter="filter"
					:items="itemsProvider"
					:fields="fields"
					:current-page="currentPage"
					:sort-by="'hostname'"
					:sort-desc="true"
					show-empty
					empty-text="No host."
					empty-filtered-text="No host, try to remove filter."
					:per-page="perPage" >
					<template slot="hostname" slot-scope="data">
						<a href="#" @click="showDetail(data.item)">
							{{data.value}}
						</a>
					</template>
					<template slot="hostInfo.SunCluster" slot-scope="data">
						<CheckMark :value="data.value"></CheckMark>
					</template>
					<template slot="hostInfo.Virtual" slot-scope="data">
						<CheckMark :value="data.value"></CheckMark>
					</template>
					<template slot="hostInfo.OracleCluster" slot-scope="data">
						<CheckMark :value="data.value"></CheckMark>
					</template>
					<template slot="hostInfo.VeritasCluster" slot-scope="data">
						<CheckMark :value="data.value"></CheckMark>
					</template>
				</b-table>
			</div>
		</div>
	</div>
</template>

<script>
import HostService from '@/services/HostService.js';
import moment from 'moment';

export default {
	name: 'Hosts',
	data() {
		return {
			currentPage: 1,
			totalRows: 0,
			perPage: 5,
			displayed: 0,
			isBusy: false,
			filter: '',
			olderThan: null,
			loading: false,
			fields: [
				{
					key: 'hostname',
					sortable: true
				},
				{
					key: 'environment',
					label: 'Env'
				},
				{
					key: 'hostType',
					label: 'Host type'
				},
				{
					key: 'associatedClusterName',
					label: 'Cluster'
				},
				{
					key: 'associatedHypervisorHostname',
					label: 'Physical Host'
				},
				{
					label: 'Last Update',
					key: 'updated',
					formatter: value => {
						return moment(value).format('DD/MM/YYYY');
					},
					sortable: true,
				},
				{
					key: 'databases',
					formatter: value => {
						return value == '' ? '-' : value;
					}
				},
				{ key: 'hostInfo.OS', label: 'OS' },
				{ key: 'hostInfo.Kernel', label: 'Kernel' },
				{
					key: 'hostInfo.OracleCluster',
					label: 'Oracle Cluster',
					class: 'text-center'
				},
				{
					key: 'hostInfo.SunCluster',
					label: 'Sun Cluster',
					class: 'text-center'
				},
				{ key: 'hostInfo.VeritasCluster', label: 'Veritas Cluster' },
				{
					key: 'hostInfo.Virtual',
					label: 'Virtual',
					class: 'text-center'
				},
				{ key: 'hostInfo.Type', label: 'Host type' },
				{ key: 'hostInfo.CPUThreads', label: 'CPU Threads' },
				{ key: 'hostInfo.CPUCores', label: 'CPU Cores' },
				{ key: 'hostInfo.Socket', label: 'Socket' },
				{ key: 'hostInfo.MemoryTotal', label: 'Mem Total' },
				{ key: 'hostInfo.SwapTotal', label: 'Swap Total' },
				{ key: 'hostInfo.CPUModel', label: 'CPU Model' }
			],
			options: [
				{ value: null, text: '' },
				{ value: '1', text: '1' },
				{ value: '2', text: '2' },
				{ value: '3', text: '3' },
				{ value: '4', text: '4' },
				{ value: '5', text: '5' },
				{ value: '6', text: '6' },
				{ value: '7', text: '7' },
				{ value: '8', text: '8' },
				{ value: '9', text: '9' },
				{ value: '10', text: '10' }
			]
		};
	},
	methods: {
		generate() {
			this.loading = true;
			return HostService.generateEx().then(() => { 
					this.loading = false
				}
			);
		},
		showDetail(item /*, index, event*/) {
			this.$router.push({ name: 'host_detail', params: { id: item.hostname } });
		},
		itemsProvider(ctx) {
			return HostService.getHosts(ctx.currentPage, ctx.filter, this.olderThan, ctx.sortBy + ',' + (ctx.sortDesc? 'desc' : 'asc'))
				.then(hosts => {
					const items = hosts.content;
					this.totalRows = hosts.numberOfElements;
					this.perPage = hosts.size;
					this.displayed = items.length;
					return items || [];
				})
				.catch(() => {
					this.$noty.error('Unable to retrieve hosts list.');
				});
		}
	},
	watch: {
		olderThan() {
			this.$refs.hostsTable.refresh();
		}
	}
};
</script>

<style scoped>
</style>
