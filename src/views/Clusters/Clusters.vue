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
				<h3>Clusters</h3>
				<b-row align-v="center" class="mb-2">
					<b-col md="6" class="my-1">
						<b-form-group horizontal label="Filter" class="mb-0">
							<b-input-group >
								<b-form-input
									v-model.trim="filter"
									placeholder="Insert cluster name" />
								<b-input-group-append>
									<b-btn :disabled="!filter" @click="filter = ''">Clear</b-btn>
								</b-input-group-append>
							</b-input-group>
						</b-form-group>
					</b-col>
				</b-row>
				<b-table
					ref="clustersTable"
					striped hover responsive small
					:busy.sync="isBusy"
					:filter="filter"
					:items="items"
					:fields="fields"
					show-empty
					empty-text="No cluster."
					empty-filtered-text="No cluster, try to remove filter." >
				</b-table>
			</div>
		</div>
	</div>
</template>

<script>
import ClusterService from '@/services/ClusterService.js';
import moment from 'moment';

export default {
	name: 'Clusters',
	data() {
		return {
			isBusy: false,
			filter: '',
			items: [],
			fields: [
				'name',
				{ key: 'cpu', label: 'Core'},
				'sockets'
			],
		};
	},
	mounted() {
		this.itemsProvider();
	},
	methods: {
		itemsProvider() {
			this.isBusy = true;
			return ClusterService.getClusters(this.filter)
				.then(clusters => {
					this.items = clusters || [];
					this.isBusy = false;
				})
				.catch(() => {
					this.$noty.error('Unable to retrieve clusters list.');
					this.isBusy = false;
				});
		}
	},
	watch: {
		filter() {
			this.itemsProvider();
		}
	}
};
</script>

<style scoped>
</style>
