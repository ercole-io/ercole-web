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
				<h3>Patch advisors</h3>
				<b-row align-v="center" class="mb-2">
					<b-col md="5" class="my-1">
						<b-form-group :label-cols="5"  horizontal label="Window time (months)" class="mb-0">
							<b-form-select v-model="windowTime" :options="windowTimeOptions" class="mb-3" />
						</b-form-group>
					</b-col>
					<b-col md="4" class="my-1">
						<b-form-group :label-cols="4"  horizontal label="Status" class="mb-0">
							<b-form-select v-model="status" :options="statusOptions" class="mb-3" />
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
				<b-table
				    striped hover responsive small
					:busy.sync="isBusy"
					:items="items"
                    :fields="fields"
					:sort-by="'hostname'"
					:sort-desc="false"
					show-empty
					empty-text="No patch advisors."
					empty-filtered-text="No patch advisors, try to remove filter.">
				</b-table>
			</div>
		</div>
	</div>
</template>

<script>
import HostService from "@/services/HostService.js";
import moment from "moment";

export default {
  name: "PatchAdvisors",
  data() {
    return {
      displayed: 0,
      isBusy: false,
      windowTime: 6,
      windowTimeOptions: [{ value: 6, text: "6" }, { value: 12, text: "12" }],
      status: "",
      statusOptions: [{ value: "", text: "All" }, { value: "KO", text: "KO" }],
      loading: false,
      items: null,
      fields: [
        {
          key: "Hostname",
          sortable: true
        },
        {
          key: "Dbname",
          label: "Database"
        },
        {
          key: "Dbver",
          label: "Version"
        },
        {
          key: "Description",
          label: "PSU"
        },
        {
          key: "Date",
          label: "Date"
        },
        {
          key: "RemainingDays",
          label: "Remaining days",
          sortable: true
        },
        {
          key: "Status",
          label: "Status"
        }
      ],
      options: [""]
    };
  },
  methods: {
    updateItems() {
      HostService.getPatchAdvisors(
        this.$store.getters.backendConfig,
        this.status,
        this.windowTime
      )
        .then(items => {
          this.items = (items || []).map(item => {
            if (moment(item.Date).format("YYYY-MM-DD") === "1970-01-01") {
              item.Date = null;
              item.RemainingDays = "∞";
            } else {
              item.RemainingDays = -moment().diff(
                moment(item.Date, "YYYY-MM-DD"),
                "days"
              );
              item.Date = moment(item.Date).format("YYYY-MM-DD");
            }
            return item;
          });
        })
        .catch(() => {
          this.$noty.error("Unable to retrieve patch advisors.");
        });
    },
    generate() {
      this.loading = true;
      return HostService.generatePatchAdvisorExcel(
        this.$store.getters.backendConfig,
        this.status,
        this.windowTime
      ).then(() => {
        this.loading = false;
      });
    }
  },
  watch: {
    windowTime() {
      this.updateItems();
    },
    status() {
      this.updateItems();
    }
  },
  mounted() {
    this.updateItems();
  }
};
</script>

<style scoped>
</style>
