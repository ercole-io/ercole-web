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
				<div class="row mb-4">
					<h3 class="col">Licenses</h3>
					<div class="col">
						<div class="text-right">
							<b-button :disabled="saveDisabled" @click="save()" variant="primary" right>
								<i class="far fa-save"></i> Save
							</b-button>
							<b-button :disabled="cancelDisabled" @click="clear()" variant="danger" right>
								<i class="far fa-trash-alt"></i> Delete
							</b-button>
						</div>
					</div>
				</div>

				<div class="row justify-content-md-center">
					<div class="col-8">
						<b-table :items="licenseStore"  sort-by="_id" :fields="fields" show-empty empty-text="No Results">
							<template slot="_id" slot-scope="row">
								<a href="#" @click="showDetail(row.item)">
									{{row.item._id}}
								</a>
							</template>
							<template slot="Count" slot-scope="row">
								<b-input type="number" min=0 v-model.number="row.item.Count" @input="_addDangerFlag();" size="sm">
								</b-input>
							</template>
							<template slot="Used" slot-scope="row">
								{{ row.item.Used }}
							</template>
							<template slot="alarm" slot-scope="row">
								<i v-if="row.item._rowVariant" class="fas fa-exclamation text-danger"></i>
							</template>
						</b-table>
					</div>
				</div>
				<!-- end row -->

			</div>
		</div>
	</div>
</template>

<script>
import LicenseService from '@/services/LicenseService';
import * as equal from 'fast-deep-equal';

export default {
	created() {
		this.loadData();
	},
	methods: {
		loadData() {
			LicenseService.mergeLicenses().then(data => {
				this.licenseStore = data;
				this._addDangerFlag();
				this.oldLicenseStore = JSON.parse(JSON.stringify(this.licenseStore));
				console.log(this.licenseStore);
			});
		},
		_addDangerFlag() {
			this.licenseStore.forEach(el => {
				if (el.Used > el.Count) {
					el._rowVariant = 'danger';
				} else {
					el._rowVariant = '';
				}
			});
		},
		clear() {
			this.licenseStore = JSON.parse(JSON.stringify(this.oldLicenseStore));
		},
		save() {
			LicenseService.saveLicenses(this.licenseStore)
				.then(() => {
					this.$noty.success('Update successful');
					this.loadData();
				})
				.catch(() => {
					this.$noty.error('Unable to save licenses informations.');
				});
		},
		showDetail(item /*, index, event*/) {
			this.$router.push({ name: 'license_detail', params: { id: item.id } });
		}
	},
	data() {
		return {
			fields: [
				{ key: '_id', label: 'Feature', sortable: true },
				{ key: 'Count', label: 'License' },
				{ key: 'Used', label: 'Used' },
				{ key: 'alarm', label: 'Status', class: 'text-center' }
			],
			licenseStore: [],
			oldLicenseStore: []
		};
	},
	computed: {
		saveDisabled() {
			return equal(this.licenseStore, this.oldLicenseStore);
		},
		cancelDisabled() {
			return equal(this.licenseStore, this.oldLicenseStore);
		}
	}
};
</script>

<style scoped>
.table td {
	vertical-align: unset;
}

input[type='number'] {
	width: 60px;
	float: right;
}
</style>
