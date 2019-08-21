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
		<div v-for="feature in items" :key="feature.name">
			<Feature :name="feature.Name" :status="feature.Status"></Feature>
		</div>
	</div>
</template>

<script>
import Feature from './Feature';

export default {
	components: {
		Feature
	},
	props: {
		features: {
			type: Array,
			default: () => []
		}
	},
	computed: {
		items() {
			const features = JSON.parse(JSON.stringify(this.features));
			return features.sort(compareFeatures);
		}
	}
};

// compare features
function compareFeatures(a, b) {
	var nameA = a.Name.toUpperCase();
	var nameB = b.Name.toUpperCase();
	if (nameA < nameB) {
		return -1;
	}
	if (nameA > nameB) {
		return 1;
	}

	// name should be equals
	return 0;
}
</script>

<style scoped>
</style>
