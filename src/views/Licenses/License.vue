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
		<b-table v-if="this.hosts != null" bordered hover 
			show-empty
			empty-text="No Hosts using the license."
			:items="hosts"
			:fields="fields"
		>
		</b-table>
	</div>
</template>

<script>
import LicenseService from '@/services/LicenseService';

export default {
	created() {
		this.loadData();
	},
	data() {
		return {
			hosts: null,
			fields: ['hostname']
		};
	},
	methods: {
		loadData() {
			LicenseService.getHostUsingLicense(this.id)
				.then(items => {
					this.hosts = items;
				})
				.catch(() => {
					this.$noty.error(`Unable to the hosts using the license ${this.id}`);
				});
		}
	},
	computed: {
		id() {
			return this.$route.params.id;
		}
	}
};
</script>
