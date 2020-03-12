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
		<b-table v-if="this.items != null" bordered hover 
			show-empty
			empty-text="No Hosts using the license."
			:items="items"
			:fields="fields"
		>
			<template slot="Hostname" slot-scope="data">
				<a href="#" @click="showDetail(data.item)">
					{{data.value}}
				</a>
			</template>
		</b-table>
	</div>
</template>

<script>
import LicenseService from "@/services/LicenseService";

export default {
  created() {
    this.loadData();
  },
  data() {
    return {
      items: null,
      fields: ["Hostname", "Databases"]
    };
  },
  methods: {
    loadData() {
      LicenseService.getHostUsingLicense(
        this.$store.getters.backendConfig,
        this.id
      )
        .then(items => {
          this.items = items.map(host => {
            host.Databases = host.Databases.join(" ");
            return host;
          });
        })
        .catch(() => {
          this.$noty.error(`Unable to the hosts using the license ${this.id}`);
        });
    },
    showDetail(item /*, index, event*/) {
      this.$router.push({ name: "host_detail", params: { id: item.Hostname } });
    }
  },
  computed: {
    id() {
      return this.$route.params.id;
    }
  }
};
</script>
