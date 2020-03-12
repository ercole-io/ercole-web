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
				<h3>Segment advisors</h3>
				<b-row align-v="center" class="mb-2">
					<b-col md="9" class="my-1">
						<b-form-group horizontal label="Filter" class="mb-0">
							<b-input-group>
								<b-form-input
									v-model.trim="filter"
									placeholder="Insert host name or database name"	/>
								<b-input-group-append>
									<b-btn :disabled="!filter" @click="filter = ''">Clear</b-btn>
								</b-input-group-append>
							</b-input-group>
						</b-form-group>
					</b-col>
					<b-col md="3" class="my-2">
						<b-form-group :label-cols="4"  class="mb-0">
							<b-button @click="generate()" :disabled="loading">
								Generate xls
							</b-button>
						</b-form-group>
					</b-col>
				</b-row>
				<b-row>
					<b-col md="4" class="my-2">
						<b-form-group :label-cols="8"  horizontal label="Enviroments" class="mb-0">
							<b-form-select v-model="env" :options="options" class="mb-3" />
						</b-form-group>
					</b-col>
				</b-row>
				<b-table
					ref="segmentAdvisorsTable"
					striped hover responsive small
					:busy.sync="isBusy"
					:items="items"
					:filter="filter"
					:fields="fields"
					:sort-by="'reclaimable'"
					:sort-desc="true"
					show-empty
					empty-text="No segment advisors."
					empty-filtered-text="No segment advisors, try to remove filter.">
				</b-table>
			</div>
		</div>
	</div>
</template>

<script>
import HostService from "@/services/HostService.js";

export default {
  name: "SegmentAdvisors",
  data() {
    return {
      displayed: 0,
      isBusy: false,
      filter: "",
      env: "",
      loading: false,
      items: null,
      fields: [
        {
          key: "Reclaimable",
          label: "Reclaimable GB",
          sortable: true
        },
        "Hostname",
        {
          key: "Dbname",
          label: "Database"
        },
        {
          key: "SegmentOwner",
          label: "Segment owner"
        },
        {
          key: "SegmentName",
          label: "Segment name"
        },
        {
          key: "SegmentType",
          label: "Segment type"
        },
        {
          key: "PartitionName",
          label: "Partition name"
        },
        "Recommendation"
      ],
      options: [""]
    };
  },
  methods: {
    updateItems() {
      HostService.getSegmentAdvisors(
        this.$store.getters.backendConfig,
        this.filter,
        this.env
      )
        .then(items => {
          this.items = items || [];
        })
        .catch(() => {
          this.$noty.error("Unable to retrieve segment advisors.");
        });
    },
    updateEnvs() {
      HostService.getEnviroments(this.$store.getters.backendConfig)
        .then(items => {
          items.unshift("");
          this.options = items || [];
        })
        .catch(() => {
          this.$noty.error("Unable to enviroments.");
        });
    },
    generate() {
      this.loading = true;
      return HostService.generateSegmentsExcel(
        this.$store.getters.backendConfig,
        this.filter,
        this.env
      ).then(() => {
        this.loading = false;
      });
    }
  },
  watch: {
    env() {
      this.updateItems();
    }
  },
  mounted() {
    this.updateItems();
    this.updateEnvs();
  }
};
</script>

<style scoped>
</style>
