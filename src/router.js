// Copyright (c) 2019 Sorint.lab S.p.A.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

import Agent from '@/views/Agent.vue';
import Alerts from '@/views/Alerts.vue';
import Dashboard from '@/views/Dashboard.vue';
import Host from '@/views/Hosts/Host.vue';
import Hosts from '@/views/Hosts/Hosts.vue';
import Databases from '@/views/Databases/Databases.vue';
import Addms from '@/views/Addms.vue';
import SegmentAdvisors from '@/views/SegmentAdvisors.vue';
import PatchAdvisors from '@/views/PatchAdvisors.vue';
import Vue from 'vue';
import Router from 'vue-router';
import Licenses from '@/views/Licenses/Licenses.vue';
import License from '@/views/Licenses/License.vue';
import Clusters from '@/views/Clusters/Clusters.vue';
import Exadata from '@/views/Exadata/Exadata.vue';

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/',
			name: '',
			component: Dashboard
		},
		{
			path: '/dashboard',
			name: 'dashboard',
			component: Dashboard
		},
		{
			path: '/hosts',
			name: 'hosts',
			component: Hosts
		},
		{
			path: '/databases',
			name: 'databases',
			component: Databases
		},
		{
			path: '/hosts/:id',
			name: 'host_detail',
			component: Host
		},
		{
			path: '/alerts',
			name: 'alerts',
			component: Alerts
		},
		{
			path: '/agent',
			name: 'agent',
			component: Agent
		},
		{
			path: '/licenses',
			name: 'licenses',
			component: Licenses
		},
		{
			path: '/licenses/:id',
			name: 'license_detail',
			component: License
		},
		{
			path: '/addms',
			name: 'addms',
			component: Addms
		},
		{
			path: '/segmentadvisors',
			name: 'segmentadvisors',
			component: SegmentAdvisors
		},
		{
			path: '/patchadvisors',
			name: 'patchadvisors',
			component: PatchAdvisors
		},
		{
			path: '/clusters',
			name: 'clusters',
			component: Clusters
		},
		{
			path: '/exadata',
			name: 'exadata',
			component: Exadata
		}
	]
});
