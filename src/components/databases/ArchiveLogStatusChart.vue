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
		<h4>Archivelog mode</h4>
		<PieChart :height="300" :chart-data="data" v-if="widget"></PieChart>
		<vue-simple-spinner v-if="spinner" size="big" message="Loading..."></vue-simple-spinner>
		<b-alert :show="alert" variant="danger">
			Unable to load data.
		</b-alert>
	</div>
</template>

<script>
import DashboardService from "@/services/DashboardService";
import { mapArrayToPieChartData } from "@/utils/PieChartMapper";

export default {
  props: {
    env: String
  },
  data() {
    return {
      widget: false,
      spinner: true,
      alert: false,
      data: []
    };
  },
  created() {
    DashboardService.getArchiveLogStatusStats(
      this.$store.getters.backendConfig,
      this.env
    )
      .then(data => {
        this.data = mapArrayToPieChartData(data, ["ArchiveLog", "Count"]);
        this.spinner = false;
        this.widget = true;
        let self = this;
        this.data.labels.forEach(function(item, index) {
          if (item == false) {
            self.data.datasets[0].backgroundColor[index] = "#ff0000";
          } else if (item == true) {
            self.data.datasets[0].backgroundColor[index] = "#8BC34A";
          }
        });
      })
      .catch(() => {
        this.$noty.error(`Unable to retrieve host ${this.id}`);
        this.spinner = false;
        this.alert = true;
      });
  },
  watch: {
    env() {
      DashboardService.getArchiveLogStatusStats(
        this.$store.getters.backendConfig,
        this.env
      )
        .then(data => {
          this.data = mapArrayToPieChartData(data, ["ArchiveLog", "Status"]);
          this.spinner = false;
          this.widget = true;
          let self = this;
          this.data.labels.forEach(function(item, index) {
            if (item == false) {
              self.data.datasets[0].backgroundColor[index] = "#ff0000";
            } else if (item == true) {
              self.data.datasets[0].backgroundColor[index] = "#8BC34A";
            }
          });
        })
        .catch(() => {
          this.$noty.error(`Unable to retrieve host ${this.id}`);
          this.spinner = false;
          this.alert = true;
        });
    }
  }
};
</script>

<style scoped>
</style>
