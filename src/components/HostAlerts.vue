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
    <div>
        <b-row>
            <b-col>
                <b-table 
					id="alerts-table" 
					show-empty
					empty-text="No Alerts."
					empty-filtered-text="No Alerts. (filter enabled)"
					:current-page="currentPage"
					:items="page" 
					:fields="fields">
                    <template slot="Date" slot-scope="data">
                        <span v-b-tooltip.hover :title="data.value | tooltip">
                            {{ data.value | date }}
                        </span>
                    </template>
                    <template slot="AlertSeverity" slot-scope="data">
                        <Severity
                            v-b-tooltip.hover :title="data.value"
                            :value="data.value"></Severity>
                    </template>
                </b-table>
            </b-col>
        </b-row>
        <b-row class="justify-content-center ">
					<b-pagination 
						:total-rows="alerts.length" 
						:per-page="perPage" 
						v-model="currentPage" class="my-0" />
				</b-row>
    </div>
</template>

<script>
import moment from "moment";
import Severity from "@/components/Severity.vue";

export default {
  name: "HostAlerts",
  components: {
    Severity
  },
  props: {
    alerts: {
      type: Array,
      required: true
    }
  },
  filters: {
    date: function(value) {
      return moment(value).fromNow();
    },
    tooltip: function(value) {
      return moment(value).format("DD-MM-YYYY HH:mm");
    }
  },
  created() {},
  data() {
    return {
      fields: [
        {
          key: "Date",
          class: "text-nowrap"
        },
        {
          key: "AlertSeverity",
          class: "text-center"
        },
        "AlertCode",
        "Description"
      ],
      perPage: 5,
      currentPage: 0
    };
  },
  computed: {
    page() {
      return this.alerts.slice(
        this.perPage * (this.currentPage - 1),
        this.perPage * this.currentPage
      );
    }
  }
};
</script>
