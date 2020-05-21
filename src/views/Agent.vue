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
				<h3>Agents</h3>
				<div class="two-column-grid mt-4">
					<ul class="list-unstyled" v-for="item in items" :key="item.os">
						<b-media tag="li">
							<div slot="aside">
								<img v-if="item.os === 'RH5'" src="@/assets/images/os_redhat_5.png" width="64" alt="rh5">
								<img v-else-if="item.os === 'RH6'" src="@/assets/images/os_redhat_6.png" width="64" alt="rh6">
								<img v-else-if="item.os === 'RH7'" src="@/assets/images/os_redhat_7.png" width="64" alt="rh7">
								<img v-else-if="item.os === 'WIN'" src="@/assets/images/os_win.png" width="64" alt="win">
								<img v-else-if="item.os === 'HPUX'" src="@/assets/images/hpux.png" width="64" alt="hpux">
								<img v-else-if="item.os === 'AIX'" src="@/assets/images/os_aix.png" width="64" alt="aix">
							</div>
							<h5 class="mt-0 mb-1">{{ item.description }}</h5>
							<a :href="item.url">{{item.filename}}</a>
						</b-media>
					</ul>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col">
				<h3>Plugins</h3>
				<div class="two-column-grid mt-4">
					<ul class="list-unstyled" v-for="item in plugins" :key="item.os">
						<b-media tag="li">
							<div slot="aside">
								<img v-if="item.platform === 'CHECKMK'" src="@/assets/images/checkmk.png" width="64" alt="rh5">
							</div>
							<h5 class="mt-0 mb-1">{{ item.description }}</h5>
							<a :href="item.url">{{item.filename}}</a>
						</b-media>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			items: [
				{
					os: 'RH7',
					description: 'Red Hat Enterprise Linux 7',
					filename: 'ercole-agent-1.6.11-1.el7.x86_64.rpm',
					url: '/packages/ercole-agent-1.6.11-1.el7.x86_64.rpm'
				},
				{
					os: 'RH6',
					description: 'Red Hat Enterprise Linux 6',
					filename: 'ercole-agent-1.6.11-1.el6.x86_64.rpm',
					url: '/packages/ercole-agent-1.6.11-1.el6.x86_64.rpm'
				},
				{
					os: 'RH5',
					description: 'Red Hat Enterprise Linux 5',
					filename: 'ercole-agent-1.6.7-1.x86_64.rpm',
					url: '/packages/ercole-agent-1.6.7-1.x86_64.rpm'
				},
				{
					os: 'WIN',
					description: 'Windows Server (64bit)',
					filename: 'ercole-agent-setup-1.6.8.exe',
					url: '/packages/ercole-agent-setup-1.6.8.exe'
				},
				{
					os: 'HPUX',
					description: 'HP-UX 11.3',
					filename: 'ercole-agent-hpux-1.6.5.tar.gz',
					url: '/packages/ercole-agent-hpux-1.6.5.tar.gz'
				},
				{
					os: 'RH7',
					description: 'Red Hat Enterprise Linux 7 (Virtualization)',
					filename: 'ercole-agent-virtualization-1.6.4-1.el7.x86_64.rpm',
					url: '/packages/ercole-agent-virtualization-1.6.4-1.el7.x86_64.rpm'
				},
				{
					os: 'RH7',
					description: 'Red Hat Enterprise Linux 7 (Exadata)',
					filename: 'ercole-agent-exadata-1.6.3-1.el7.x86_64.rpm',
					url: '/packages/ercole-agent-exadata-1.6.3-1.el7.x86_64.rpm'
				},
				{
					os: 'RH6',
					description: 'Red Hat Enterprise Linux 6 (Exadata)',
					filename: 'ercole-agent-exadata-1.6.3-1.el6.x86_64.rpm',
					url: '/packages/ercole-agent-exadata-1.6.3-1.el6.x86_64.rpm'
				},
				{
					os: 'AIX',
					description: 'AIX Advanced Interactive eXecutive 6.1',
					filename: 'ercole-agent-aix-1.6.8-1.aix6.1.noarch.rpm',
					url: '/packages/ercole-agent-aix-1.6.8-1.aix6.1.noarch.rpm'
				},
			],
			plugins: [
				{
					platform: 'CHECKMK',
					description: 'Checkmk',
					filename: 'ercole-checkmk-1.0.0.tar.gz',
					url: '/packages/ercole-checkmk-1.0.0.tar.gz'
				},
			]
		};
	},
};
</script>

<style scoped>
</style>
