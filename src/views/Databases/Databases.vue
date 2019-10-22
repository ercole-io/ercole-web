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
				<h3>Databases</h3>
				<b-row align-v="center" class="mb-2">
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
					:filter="filter"
					:items="itemsProvider"
					:fields="fields"
					:current-page="currentPage"
					show-empty
					empty-text="No databases."
					empty-filtered-text="No databases, try to remove filter."
					:per-page="perPage" >
					<template slot="hostname" slot-scope="data">
						<a href="#" @click="showDetail(data.item)">
							{{data.value}}
						</a>
					</template>
				</b-table>
			</div>
		</div>
	</div>
</template>

<script>
import HostService from '@/services/HostService.js';

export default {
	name: 'Databases',
	data() {
		return {
			currentPage: 1,
			totalRows: 0,
			perPage: 5,
			displayed: 0,
			isBusy: false,
			fields: [
				{
					key: 'hostname',
					sortable: true
				},
				{
					key: 'dbname'
				},
				'environment',
				'location',
				'dbver'
			]
		};
	},
	methods: {
		showDetail(item /*, index, event*/) {
			this.$router.push({ name: 'host_detail', params: { id: item.hostname } });
		},
		itemsProvider(ctx) {
			return HostService.getDatabases(ctx.currentPage, ctx.sortBy + ',' + (ctx.sortDesc? 'desc' : 'asc'))
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
	watch: {
		olderThan() {
			this.$refs.databasesTable.refresh();
		}
	}
};
</script>

<style scoped>
</style>
