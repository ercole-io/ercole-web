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
			<div class="col" v-if="host != null">
				<h3>Host Detail</h3>
				<div class="row ">
					<div class="col-10">
						<History
							class="mb-2"
							:updated="host.CreatedAt"
							:archived="host.Archived"
							@update-date="handleDateUpdate($event)">
						</History>
					</div>
					<b-button @click="dismiss()" class="col-2 mb-3">
						Dismiss
					</b-button>
				</div>
				<b-card :title="id" class="mb-3">
					<div class="card-text two-column-grid">
						<span><strong>Host type</strong>: {{host.HostType}}</span>
						<span v-if="host.HostType=='oracledb' || host.HostType==null"><strong>Databases</strong>: {{host.Databases}}</span>
						<span><strong>Environment</strong>: {{host.Environment}}</span>
						<span><strong>Location</strong>: {{host.Location}}</span>
					</div>
					<div class="card-text one-column-grid">
						<span v-if="host.HostType=='oracledb' || host.HostType==null"><strong>Schemas</strong>: {{showAllSchemas? host.Schemas : partialSchemas}}</span>
						<a v-if="splittedSchemas.length >= 50" href="#" @click="showAllSchemas = !showAllSchemas">
							{{ showAllSchemas? '&lt;--' : '...'}}
						</a>
					</div>
				</b-card>

				<b-card class="mb-3" v-if="host.Info != null">
					<h6 slot="header" class="mb-0">
						<i class="fas fa-server"></i>
						Host Infos
					</h6>
					<div class="card-text two-column-grid">
						<span><strong>Hostname</strong>: {{host.Info.Hostname}}</span>
						<span><strong>Environment</strong>: {{host.Info.Environment}}</span>
						<span><strong>Location</strong>: {{host.Info.Location}}</span>
						<span><strong>Agent version</strong>: {{host.Version}}</span>
						<span><strong>OS</strong>: {{host.Info.OS}}</span>
						<span><strong>Kernel</strong>: {{host.Info.Kernel}}</span>
						<span><strong>Virtual</strong>: {{host.Info.Virtual}}</span>
						<span><strong>Platform Type</strong>: {{(host.Info.Type == 'PH')? 'BARE METAL' : host.Info.Type}}</span>
						<span><strong>OracleCluster</strong>: {{host.Info.OracleCluster}}</span>
						<span><strong>SunCluster</strong>: {{host.Info.SunCluster}}</span>
						<span><strong>VeritasCluster</strong>: {{host.Info.VeritasCluster}}</span>
						<span><strong>CPUModel</strong>: {{host.Info.CPUModel}}</span>
						<span><strong>CPUThreads</strong>: {{host.Info.CPUThreads}}</span>
						<span><strong>CPUCores</strong>: {{host.Info.CPUCores}}</span>
						<span><strong>CPU Socket</strong>: {{host.Info.Socket}}</span>
						<span><strong>MemoryTotal</strong>: {{host.Info.MemoryTotal}}</span>
						<span><strong>SwapTotal</strong>: {{host.Info.SwapTotal}}</span>
					</div>
				</b-card>

				<div v-if="host.Extra != null">
					<b-card class="mb-3" v-if="host.Extra.Databases != null && host.HostType == 'oracledb' || host.HostType == null">
						<h6 slot="header" class="mb-0">
							<i class="fas fa-database"></i>
							Databases
						</h6>
						<p class="card-text">
							<Databases :available_tags="tags_options" @tag_deleted="tagDeleted" @add_tag="addTag" :databases="host.Extra.Databases" @clear_license="clearLicense" @recover_license="recoverLicense"></Databases>
						</p>
					</b-card>
					<b-card class="mb-3" v-if="host.Extra.Clusters != null && host.HostType == 'virtualization'">
						<h6 slot="header" class="mb-0">
							<i class="fas fa-cluster"></i>
							Clusters
						</h6>
						<p class="card-text">
							<Clusters :clusters="host.Extra.Clusters"></Clusters>
						</p>
					</b-card>
					<b-card class="mb-3" v-if="host.Extra.Exadata != null && host.HostType == 'exadata'">
						<h6 slot="header" class="mb-0">
							<i class="fas fa-server"></i>
							Exadata
						</h6>
						<p class="card-text">
							<Exadata :exadata="host.Extra.Exadata"></Exadata>
						</p>
					</b-card>
					<b-card class="mb-3" v-if="host.Extra.Filesystems != null">
						<h6 slot="header" class="mb-0">
							<i class="fas fa-folder"></i>
							Filesystems
						</h6>
						<p class="card-text">
							<Filesystem :filesystem="host.Extra.Filesystems"></Filesystem>
						</p>
					</b-card>
				</div>


			</div>
		</div>
		<b-row>
			<b-col>
				<b-card>
					<h6 slot="header" class="mb-0">
						<i class="fas fa-bell"></i>
						Host's Alerts
					</h6>
					<HostAlerts :alerts="host.Alerts"></HostAlerts>
				</b-card>
			</b-col>
		</b-row>
	</div>
</template>

<script>
import Databases from '@/components/Databases.vue';
import Clusters from '@/components/Clusters.vue';
import Exadata from '@/components/Exadata.vue';
import Filesystem from '@/components/Filesystem.vue';
import HostService from '@/services/HostService.js';
import DashService from '@/services/DashboardService.js';
import History from '@/components/History.vue';
import HostAlerts from '@/components/HostAlerts.vue';
import Noty from 'noty';

export default {
	components: {
		HostAlerts,
		Databases,
		Clusters,
		Exadata,
		Filesystem,
		History
	},
	data() {
		return {
			host: null,
			showAllSchemas: false,
			tags_options: [ "" ],
			tags: {}
		};
	},
	methods: {
		handleDateUpdate(event) {
			if (event == null) {
				HostService.getHost(this.id)
					.then(host => {
						this.host = host;
					})
					.catch(() => {
						this.$noty.error(`Unable to retrieve host ${this.id}`);
					});
			} else {
				HostService.getHostHistory(this.id, event)
					.then(host => {
						this.host = host;
					})
					.catch(err => {
						this.$noty.error(err);
					});
			}
		},
		dismiss() {
			let self = this;
			var n = new Noty({
				text: 'Are you sure to dismiss the host?',
				type: 'warning',
				layout: 'center',
				buttons: [
					Noty.button('YES', 'btn btn-success', function () {
						HostService.dismiss(self.id);
						self.$router.push({ name: 'hosts' });
						n.close();
					}), 
					Noty.button('NO', 'btn btn-error', function () {
						n.close();
					})
				]
			});
			n.show();
		}, 
		tagDeleted(dbname, tag) {
			HostService.deleteTag(this.id, dbname, tag)
				.then(tag => {
					//Delete the tag
					this.handleDateUpdate(null);
				}).catch(err => {
					this.$noty.error(err);
				})
		},
		addTag(dbname, tagname) {
			if (tagname !== '') {
				HostService.addTag(this.id, dbname, tagname)
				.then(tag => {
					//Add the tag
					this.handleDateUpdate(null);
				}).catch(err => {
					this.$noty.error(err);
				})
			}
		},
		clearLicense(dbname, licenseName) {
			HostService.clearLicense(this.id, dbname, licenseName)
				.then(() => {
					this.host["Extra"]["Databases"].forEach(item => {
						if (item["Name"] === dbname) {
							item["Licenses"].forEach(item2 => {
								if (item2["Name"] === licenseName) {
									item2["OldCount"] = item2["Count"];
									item2["Count"] = 0;
								}
							});
						}
					});		
				})
				.catch(err => {
					this.$noty.error(err);
				})
		},
		recoverLicense(dbname, licenseName) {
			HostService.recoverLicense(this.id, dbname, licenseName)
				.then(() => {
					this.host["Extra"]["Databases"].forEach(item => {
						if (item["Name"] === dbname) {
							item["Licenses"].forEach(item2 => {
								if (item2["Name"] === licenseName) {
									item2["Count"] = item2["OldCount"];
									delete item2["OldCount"]; 
								}
							});
						}
					});		
				})
				.catch(err => {
					this.$noty.error(err);
				})
		}
	},
	created() {
		HostService.getHost(this.id)
			.then(host => {
				this.host = host;
			})
			.catch(() => {
				this.$noty.error(`Unable to retrieve host ${this.id}`);
			});
		DashService.getAvailableTags()
			.then(tags => {
				this.tags_options = [""].concat(tags);
			}).catch(err => {
				this.$noty.error(err);
			});
	},
	computed: {
		id() {
			return this.$route.params.id;
		},
		splittedSchemas() {
			return this.host.Schemas.split(' ')
		},
		partialSchemas() {
			return this.splittedSchemas.slice(0, 50).join(' ')
		}
	}
};
</script>