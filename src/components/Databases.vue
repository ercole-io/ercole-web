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
		<b-card no-body class="mb-2" v-for="(db, index) in databases" :key="db.id">
			<b-card-header header-tag="header" class="p-1" role="tab">
				<b-button block size variant="link" @click="setTabVisible(index)">
					{{db.Name}}
					<i v-if="tabVisible === index" class="fas fa-caret-up"></i>
					<i v-else class="fas fa-caret-down"></i>
				</b-button>
			</b-card-header>
			<b-collapse :id="'accordion'+(index + 1)" :visible="tabVisible === index" accordion="databases-accordion" role="tabpanel">
				<b-card-body>
					<div class="card-text four-column-grid mb-3">
						<span><strong>ASM</strong>: {{db.ASM}}</span>
						<span><strong>Allocable (GB)</strong>: {{db.Allocated}}</span>
						<span><strong>Archivelog</strong>: {{db.Archivelog}}</span>
						<span><strong>BlockSize</strong>: {{db.BlockSize}}</span>
						<span><strong>CPUCount</strong>: {{db.CPUCount}}</span>
						<span><strong>Charset</strong>: {{db.Charset}}</span>
						<span><strong>DBTime</strong>: {{db.DBTime}}</span>
						<span><strong>Dataguard</strong>: {{db.Dataguard}}</span>
						<span><strong>Elapsed</strong>: {{db.Elapsed}}</span>
						<span><strong>MemoryTarget</strong>: {{db.MemoryTarget}}</span>
						<span><strong>NCharset</strong>: {{db.NCharset}}</span>
						<span><strong>Name</strong>: {{db.Name}}</span>
						<span><strong>PGATarget (GB)</strong>: {{db.PGATarget}}</span>
						<span><strong>Platform</strong>: {{db.Platform}}</span>
						<span><strong>SGAMaxSize (GB)</strong>: {{db.SGAMaxSize}}</span>
						<span><strong>SGATarget (GB)</strong>: {{db.SGATarget}}</span>
						<span><strong>Status</strong>: {{db.Status}}</span>
						<span><strong>UniqueName</strong>: {{db.UniqueName}}</span>
						<span><strong>DatafileSize (GB)</strong>: {{db.Used}}</span>
						<span v-if="db.SegmentsSize != null"><strong>SegmentsSize (GB)</strong>: {{db.SegmentsSize}}</span>
						<span><strong>Version</strong>: {{db.Version}}</span>
						<span><strong>Work</strong>: {{db.Work}}</span>
					</div>
					<div v-if="tags" class="card-text mb-3">
						<b-select v-model="choosen_tags[db.Name]" @change="changeTagEventEmitter(db.Name, $event)" :options="available_tags" class="vw-5 mx-1 mb-3" />
						<span v-for="t in tags[db.Name]" :key="t.id" class="mx-1 badge badge-secondary mb-3">
							{{t.tag}}
							<b-button @click="$emit('tag_deleted', t)" class="btn-secondary btn btn-sm">
								<i class="fas fa-backspace "></i> 
							</b-button>
						</span>
					</div>
					<b-card no-body>
						<b-tabs card>
							<b-tab :disabled="db.Licenses == null">
								<template slot="title">
									<i class="fas fa-certificate"></i> Licenses
								</template>
								<Licenses @clear_license="$emit('clear_license', db.Name, $event)" @recover_license="$emit('recover_license', db.Name, $event)" :licenses="db.Licenses" v-if="db.Licenses"></Licenses>
							</b-tab>
							<b-tab :disabled="db.Features == null">
								<template slot="title">
									<i class="fas fa-cubes"></i> Features
								</template>
								<Features :features="db.Features" v-if="db.Features"></Features>
							</b-tab>
							<b-tab :disabled="db.Tablespaces == null">
								<template slot="title">
									<i class="fas fa-th-large"></i> Tablespaces
								</template>
								<Tablespace :tablespaces="db.Tablespaces" v-if="db.Tablespaces" class="mt-2"></Tablespace>
							</b-tab>
							<b-tab :disabled="db.Schemas == null">
								<template slot="title" >
									<i class="fas fa-table"></i> Schemas
								</template>
								<Schema :schemas="db.Schemas" v-if="db.Schemas"></Schema>
							</b-tab>
							<b-tab  :disabled="db.Patches == null">
								<template slot="title">
									<i class="fab fa-product-hunt"></i> Patches
								</template>
								<Patches :patches="db.Patches" v-if="db.Patches"></Patches>
							</b-tab>
							<b-tab  :disabled="db.LastPSUs == null">
								<template slot="title">
									<i class="fab fa-product-hunt"></i> PSUs
								</template>
								<PSUs :psus="db.LastPSUs" v-if="db.LastPSUs"></PSUs>
							</b-tab>
							<b-tab  :disabled="db.ADDMs == null">
								<template slot="title">
									<i class="fab fa-product-hunt"></i> ADDMs
								</template>
								<ADDMs :addms="db.ADDMs" v-if="db.ADDMs"></ADDMs>
							</b-tab>
							<b-tab  :disabled="db.SegmentAdvisors == null">
								<template slot="title">
									<i class="fab fa-product-hunt"></i> Segment Advisors
								</template>
								<SegmentAdvisors :segmentAdvisors="db.SegmentAdvisors" v-if="db.SegmentAdvisors"></SegmentAdvisors>
							</b-tab>
							<b-tab>
								<template slot="title">
									<i class="fas fa-chart-area"></i> DBGrowth
								</template>
								<TimeLineChart :height="300" v-if="grow" :chartData="databasesGrowChartData[db.Name]"></TimeLineChart>
							</b-tab>
							<b-tab  :disabled="db.Backups == null">
								<template slot="title">
									<i class="fab fa-product-hunt"></i> Backups
								</template>
								<Backups :backups="db.Backups" v-if="db.Backups"></Backups>
							</b-tab>
						</b-tabs>
					</b-card>
				</b-card-body>
			</b-collapse>
		</b-card>
	</div>
</template>

<script>
import Schema from '@/components/Schema.vue';
import Tablespace from '@/components/Tablespace.vue';
import Licenses from '@/components/Licenses.vue';
import Features from '@/components/Features.vue';
import Patches from '@/components/Patches.vue';
import ADDMs from '@/components/ADDMs.vue';
import SegmentAdvisors from '@/components/SegmentAdvisors.vue';
import PSUs from '@/components/PSUs.vue';
import Backups from '@/components/Backups.vue';
import TimeLineChart from '@/components/TimeLineChart.vue';
import { mapArrayToLineTimeChartData } from '@/utils/PieChartMapper';
import Colors from '@/utils/Colors';
import DataguardStatusChart from '@/components/databases/DataguardStatusChart.vue';


export default {	
	components: {
		Schema,
		Tablespace,
		Licenses,
		Features,
		Patches,
		ADDMs,
		SegmentAdvisors,
		PSUs,
		Backups,
		TimeLineChart,
		DataguardStatusChart
	},
	props: {
		databases: {
			type: Array,
			default: () => []
		},
		grow: {},
		segmentsSizeGrow: {},
		available_tags: {
			type: Array,
			default: () => []
		},
		tags: {}
	},
	data() {
		return {
			tabVisible: 0,
			choosen_tags: {}
		};
	},
	mounted() {
	},
	methods: {
		setTabVisible(index) {
			if (this.tabVisible === index) {
				this.tabVisible = -1;
			} else {
				this.tabVisible = index;
			}
		},
		changeTagEventEmitter(dbname, value) {
			this.$emit("add_tag", dbname, value);
		}
	},
	computed: {
		databasesGrowChartData() {
			var stats = {};
			let self = this;
			this.databases.forEach(function(db) {
				if (self.grow[db.Name] === undefined || self.segmentsSizeGrow[db.Name] === undefined)
				{
					return;
				}
				let usedData = mapArrayToLineTimeChartData(self.grow[db.Name], ['updated', 'used']);
				let segmentsGrowData = mapArrayToLineTimeChartData(self.segmentsSizeGrow[db.Name], ['updated', 'segmentssize']);
				stats[db.Name] = {
					"datasets": [
						{
							label: "DataFileSize (GB)",
							data: usedData["datasets"][0]["data"],		
							backgroundColor: Colors.pieChart["blue"],
							borderColor: Colors.pieChart["blue"],
							fill: false,
							type: 'line',
						},
						{
							label: "SegmentsSize (GB)",
							data: segmentsGrowData["datasets"][0]["data"],
							backgroundColor: Colors.pieChart["green"],
							borderColor: Colors.pieChart["green"],
							fill: false,
							type: 'line',
						}
					]
				}
			});
			return stats;
		},
	},
	watch: {
	}
};
</script>

<style scoped>
</style>