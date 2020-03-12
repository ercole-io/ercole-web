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
	<div class="container">
		<div class="row">
			<div class="col">
				<h3>Alerts</h3>
				<b-row class="mb-2" align-v="center"  >
					<b-col>
						<b-button size="sm"
							@click="markRead(selected)"
							:disabled="markReadDisabled">
							Mark as read <b-badge variant="light" v-if="selected.length > 0">{{ selected.length }}</b-badge>
						</b-button>
					</b-col>
					<b-col md="6" class="my-1">
						<b-form-group horizontal label="Filter" class="mb-0">
							<b-input-group >
								<b-form-input
									v-model.trim="filter"
									placeholder="Insert text" />
								<b-input-group-append>
									<b-btn :disabled="!filter" @click="filter = ''">Clear</b-btn>
								</b-input-group-append>
							</b-input-group>
						</b-form-group>
					</b-col>
					<b-col md="4" class="mb-1">
						<b-form-group :label-cols="4"  horizontal label="Filter by severity" class="mb-0">
							<b-form-select v-model="severityLevel" :options="severityLevels" class="mb-1" />
						</b-form-group>
					</b-col>
					<b-col cols="5">
						<b-form inline class="float-right">
							<b-form-checkbox id="checkbox1"
								v-model="onlyNewAlerts"
								unchecked-value="no"
								value="yes">
								Show only unread
							</b-form-checkbox>
						</b-form>
					</b-col>
				</b-row>
				<b-row class="mb-2" align-v="center"  >
					<div class="col-md-6">
						Start date:
						<date-picker v-model="startdate" :config="options"></date-picker>
					</div>
					<div class="col-md-6">
						End date:
						<date-picker v-model="enddate" :config="options"></date-picker>
					</div>
				</b-row>
				<b-table hover
					show-empty
					ref="table"
					empty-text="No notification."
					empty-filtered-text="No notification. (filter enabled)"
					:sort-compare="compareAlerts"
					sort-by="date"
					outlined
					:filter="onlyNewAlerts"
					:items="myProvider"
					:current-page="currentPage"
					:fields="fields">
					<template slot="AlertSeverity" slot-scope="data">
						<Severity
							v-b-tooltip.hover :title="data.value"
							:value="data.value"></Severity>
					</template>
					<template slot="Hostname" slot-scope="data">
						<router-link :to="{ name: 'host_detail', params: { id: data.value }}">
							<span>{{data.value}}</span>
						</router-link>
					</template>
					<template slot="selection" slot-scope="data">
						<b-form-checkbox 
							plain 
							v-model="selected" 
							:disabled="data.item.AlertStatus === 'ACK'"
							:value="data.item._id">&nbsp;
						</b-form-checkbox>
					</template>
					<template slot="Date" slot-scope="data">
						<span v-b-tooltip.hover :title="data.value | tooltip">
							{{ data.value | date }}
						</span>
					</template>
				</b-table>
				 <b-row class="justify-content-center ">
					<b-pagination 
						:total-rows="totalRows" 
						:per-page="perPage" 
						v-model="currentPage" class="my-0" />
				</b-row>
			</div>
		</div>
	</div>
</template>

<script>
import moment from "moment";
import datePicker from "vue-bootstrap-datetimepicker";
import "pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css";

import AlertService from "@/services/AlertService.js";
import Severity from "@/components/Severity";

export default {
  components: {
    Severity,
    datePicker
  },
  filters: {
    date: function(value) {
      return moment(value).fromNow();
    },
    tooltip: function(value) {
      return moment(value).format("DD-MM-YYYY HH:mm");
    }
  },
  data() {
    return {
      selected: [],
      onlyNewAlerts: "yes",
      fields: [
        { key: "selection", label: "&nbsp;" },
        {
          key: "Date",
          class: "text-nowrap"
        },
        {
          key: "AlertSeverity",
          class: "text-center"
        },
        "Hostname",
        {
          key: "AlertCode",
          label: "Code"
        },
        {
          key: "Description",
          label: "Description"
        }
      ],
      totalRows: 0,
      perPage: 20,
      currentPage: 1,
      severityLevel: null,
      filter: "",
      severityLevels: [
        { value: null, text: "" },
        { value: "MINOR", text: "Minor" },
        { value: "WARNING", text: "Warning" },
        { value: "MAJOR", text: "Major" },
        { value: "CRITICAL", text: "Critical" },
        { value: "NOTICE", text: "Notice" }
      ],
      startdate: null,
      enddate: null,
      options: {
        useCurrent: true,
        showClear: true,
        format: "YYYY-MM-DD"
      }
    };
  },
  created() {
    this.$store.dispatch("loadNotifications");
  },
  methods: {
    handleResponse(data) {
      const items = data.Content;
      this.totalRows = data.Metadata.TotalElements;
      this.perPage = data.Metadata.Size;
      this.currentPage = data.Metadata.Number + 1;
      items.forEach(el => {
        if (el.status === "NEW") {
          el._rowVariant = "bold";
        }
      });
      return items;
    },
    myProvider(ctx) {
      if (ctx.filter === "yes") {
        return AlertService.getNewAlerts(
          this.$store.getters.backendConfig,
          ctx.currentPage,
          this.severityLevel,
          this.filter,
          this.startdate,
          this.enddate
        ).then(this.handleResponse);
      } else {
        return AlertService.getAlerts(
          this.$store.getters.backendConfig,
          ctx.currentPage,
          this.severityLevel,
          this.filter,
          this.startdate,
          this.enddate
        ).then(this.handleResponse);
      }
    },
    compareAlerts(a, b, field) {
      if (field === "date") {
        let diff = -moment(a.date).diff(moment(b.date));
        return diff;
      }
    },
    markRead(selected) {
      Promise.all(selected.map(sel => AlertService.updateAlert(this.$store.getters.backendConfig, sel)))
        .then(() => {
          this.$store.dispatch("loadNotifications");
          this.$refs.table.refresh();
        })
        .catch(err => {
          this.$noty.error(err);
        });
    }
  },
  computed: {
    markReadDisabled() {
      return this.selected.length === 0;
    }
  },
  watch: {
    severityLevel() {
      this.$refs.table.refresh();
    },
    filter() {
      this.$refs.table.refresh();
    },
    startdate() {
      this.$refs.table.refresh();
    },
    enddate() {
      this.$refs.table.refresh();
    }
  }
};
</script>

<style>
</style>
