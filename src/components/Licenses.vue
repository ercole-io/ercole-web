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
	<div class="three-column-grid">
		<div v-for="license in items" :key="license.name">
			<LicenseRow :name="license.Name" :count="license.Count"></LicenseRow>
		</div>
	</div>
</template>

<script>
import LicenseRow from './LicenseRow';

export default {
	components: {
		LicenseRow
	},
	props: {
		licenses: {
			type: Array,
			default: () => []
		}
	},
	computed: {
		items() {
			const items = JSON.parse(JSON.stringify(this.licenses));
			return items.sort(compareLicenses);
		}
	}
};

const oracleRegexp = new RegExp('^Oracle', 'i');

// sort the licenses by their name
function compareLicenses(a, b) {
	var nameA = a.Name.toUpperCase();
	var nameB = b.Name.toUpperCase();

	// if string starts with Oracle should be placed first
	if (oracleRegexp.test(a.Name)) return -1;
	if (oracleRegexp.test(b.Name)) return 1;

	if (nameA < nameB) {
		return -1;
	}
	if (nameA > nameB) {
		return 1;
	}

	// name are equals
	return 0;
}
</script>

<style scoped>
</style>
