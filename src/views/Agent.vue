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
import Filesaver from 'file-saver';
import Axios from 'axios';

export default {
	data() {
		return {
			items: [
				{
					os: 'RH7',
					description: 'Red Hat Enterprise Linux 7',
					filename: 'ercole-agent-1.5.9-1.el7.x86_64.rpm',
					url: '/packages/ercole-agent-1.5.9-1.el7.x86_64.rpm'
				},
				{
					os: 'RH6',
					description: 'Red Hat Enterprise Linux 6',
					filename: 'ercole-agent-1.5.9-1.el6.x86_64.rpm',
					url: '/packages/ercole-agent-1.5.9-1.el6.x86_64.rpm'
				},
				{
					os: 'RH5',
					description: 'Red Hat Enterprise Linux 5',
					filename: 'ercole-agent-1.5.9-1.x86_64.rpm',
					url: '/packages/ercole-agent-1.5.9-1.x86_64.rpm'
				},
				{
					os: 'WIN',
					description: 'Windows Server (64bit)',
					filename: 'ercole-agent-setup-1.5.9.exe',
					url: '/packages/ercole-agent-setup-1.5.9.exe' 
				},
				{
					os: 'RH7',
					description: 'Red Hat Enterprise Linux 7 (Virtualization)',
					filename: 'ercole-agent-virtualization-1.5.3-1.el7.x86_64.rpm',
					url: '/packages/ercole-agent-virtualization-1.5.3-1.el7.x86_64.rpm'
				},
			]
		};
	},

};
</script>

<style scoped>
</style>
