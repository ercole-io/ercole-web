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
		<b-card no-body class="mb-2" v-for="(dev, index) in exadata.Devices" :key="dev.Hostname">
			<b-card-header header-tag="header" class="p-1" role="tab">
				<b-button block size variant="link" @click="setTabVisible(index)">
					{{dev.Hostname}}
					<i v-if="tabVisible === index" class="fas fa-caret-up"></i>
					<i v-else class="fas fa-caret-down"></i>
				</b-button>
			</b-card-header>
			<b-collapse :id="'accordion'+(index + 1)" :visible="tabVisible === index" accordion="devices-accordion" role="tabpanel">
				<b-card-body>
					<div class="card-text four-column-grid mb-3">
						<span><strong>Hostname</strong>: {{dev.Hostname}}</span>
						<span><strong>ServerType</strong>: {{dev.ServerType}}</span>
						<span><strong>Model</strong>: {{dev.Model}}</span>
						<span><strong>ExaSwVersion</strong>: {{dev.ExaSwVersion}}</span>
						<span><strong>CpuEnabled</strong>: {{dev.CPUEnabled}}</span>
						<span><strong>Memory</strong>: {{dev.Memory}}</span>
						<span><strong>Status</strong>: {{dev.Status}}</span>
						<span><strong>PowerCount</strong>: {{dev.PowerCount}}</span>
						<span><strong>PowerStatus</strong>: {{dev.PowerStatus}}</span>
						<span><strong>FanCount</strong>: {{dev.FanCount}}</span>
						<span><strong>FanStatus</strong>: {{dev.FanStatus}}</span>
						<span><strong>TempActual</strong>: {{dev.TempActual}}</span>
						<span><strong>TempStatus</strong>: {{dev.TempStatus}}</span>
						<span><strong>CellsrvService</strong>: {{dev.CellsrvService}}</span>
						<span><strong>MsService</strong>: {{dev.MsService}}</span>
						<span><strong>RsService</strong>: {{dev.RsService}}</span>
						<span><strong>FlashcacheMode</strong>: {{dev.FlashcacheMode}}</span>
					</div>
					<b-card v-if="dev.CellDisks" no-body>
						<b-tabs card>
							<b-tab  :disabled="dev.CellDisks == null">
								<template slot="title">
									<i class="fas fa-compact-disc-large"></i> Cell disks
								</template>
								<CellDisks :cellDisks="dev.CellDisks" v-if="dev.CellDisks" class="mt-2"></CellDisks>
							</b-tab>
						</b-tabs>
					</b-card>
				</b-card-body>
			</b-collapse>
		</b-card>
	</div>
</template>

<script>
import CellDisks from "@/components/CellDisks.vue";

export default {
  components: {
    CellDisks
  },
  props: {
    exadata: {
      type: Object
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
