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
	<div role="tablist">
		<b-card no-body class="mb-2" v-for="(cluster, index) in clusters" :key="cluster.id">
			<b-card-header header-tag="header" class="p-1" role="tab">
				<b-button block size variant="link" @click="setTabVisible(index)">
					{{cluster.Name}}
					<i v-if="tabVisible === index" class="fas fa-caret-up"></i>
					<i v-else class="fas fa-caret-down"></i>
				</b-button>
			</b-card-header>
			<b-collapse :id="'accordion'+(index + 1)" :visible="tabVisible === index" accordion="databases-accordion" role="tabpanel">
				<b-card-body>
					<div class="card-text four-column-grid mb-3">
						<span><strong>CPU</strong>: {{cluster.CPU}}</span>
						<span><strong>Sockets</strong>: {{cluster.Sockets}}</span>

					</div>
					<b-card no-body>
						<b-tabs card>
							<b-tab :disabled="cluster.VMs == null">
								<template slot="title">
									<i class="fas fa-th-large"></i> Virtual Machines
								</template>
								<VMs :vms="cluster.VMs" v-if="cluster.VMs" class="mt-2"></VMs>
							</b-tab>
						</b-tabs>
					</b-card>
				</b-card-body>
			</b-collapse>
		</b-card>
	</div>
</template>

<script>
import VMs from '@/components/VMs.vue';

export default {
	components: {
		VMs
	},
	props: {
		clusters: {
			type: Array,
			default: () => []
		}
	},
	data() {
		return {
			tabVisible: 0
		};
	},
	methods: {
		setTabVisible(index) {
			if (this.tabVisible === index) {
				this.tabVisible = -1;
			} else {
				this.tabVisible = index;
			}
		}
	}
};
</script>

<style scoped>
</style>
