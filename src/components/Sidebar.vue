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
	<nav id="sidebar" :class="{ 'active' : !full }">
		<!-- Sidebar Header -->
		<div class="sidebar-header">
			<router-link to="/">
				<img v-if="full" src="@/assets/images/ercole.png" class="img-fluid" alt="">
				<img v-else src="@/assets/images/ercole_logo.png" class="img-fluid" alt="">
			</router-link>
		</div>

		<!-- Sidebar Links -->
		<ul class="list-unstyled components">
			<li>
				<router-link to="/dashboard">
					<i class="fas fa-chart-line"></i>
					Dashboard
				</router-link>
			</li>

			<li>
				<router-link to="/hosts">
					<i class="fas fa-server"></i>
					Hosts
				</router-link>
			</li>

			<li>
				<router-link to="/databases">
					<i class="fas fa-database"></i>
					Databases
				</router-link>
			</li>

			<li>
				<router-link to="/clusters">
					<i class="fas fa-object-group"></i>
					Hypervisor
				</router-link>
			</li>

			<li>
				<router-link to="/alerts">
					<i class="fas fa-bell"></i>
					Alerts
				</router-link>
			</li>

			<li>
				<router-link to="/licenses">
					<i class="fas fa-certificate"></i>
					Licenses
				</router-link>
			</li>
		 	
			<li style="cursor: pointer">
				<a @click="showProactiveMenu = !showProactiveMenu">
					<i class="fas fa-stethoscope"></i>
					Proactive
				</a>
			</li>
			<b-collapse v-model="showProactiveMenu">
				<ul class="submenu">
					<li>
						<router-link to="/addms">
							<i class="fas fa-heartbeat"></i>
							ADDM
						</router-link>
					</li>

					<li>
						<router-link to="/segmentadvisors">
							<i class="fas fa-columns"></i>
							Segment advisors
						</router-link>
					</li>

					<li>
						<router-link to="/patchadvisors">
							<i class="fas fa-band-aid"></i>
							Patch advisors
						</router-link>
					</li>
				</ul>
			</b-collapse>

			<li>
				<router-link to="/Exadata">
					<i class="fas fa-server"></i>
					Exadata
				</router-link>
			</li>

			<li>
				<router-link to="/agent">
					<i class="fas fa-arrow-down"></i>
					Agent
				</router-link>
			</li>
		</ul>
	</nav>
</template>

<script>
/*
 *   https://bootstrapious.com/p/bootstrap-sidebar
 */
export default {
	name: 'Sidebar',
	data() {
		return {
			showProactiveMenu: false
		}
	},
	props: {
		full: {
			type: Boolean,
			default: true
		}
	}
};
</script>

<style lang="scss" scoped>
#sidebar {
	background-color: rgb(38, 44, 48);
	min-height: 100vh;
	flex: 0 0 240px;
	transition: flex 0.5s;
}

/* Shrinking the sidebar from 250px to 80px and center aligining its content*/
#sidebar.active {
	text-align: center;
	font-size: 0.85em;
	flex: 0 0 80px;
	transition: flex 0.5s;
}

#sidebar .sidebar-header img {
	margin: 10px;
}

#sidebar.active .sidebar-header img {
	margin: 0px;
}

#sidebar ul.components {
	padding: 20px 0;
}

.sidebar-header {
	display: flex;
	justify-content: left;
	flex-flow: wrap;
	margin-top: 10px;
	align-items: left;
}

#sidebar .sidebar-header {
	margin-bottom: 2rem;
}

#sidebar.active .sidebar-header {
	margin-bottom: 0px;
	justify-content: center;
	align-items: center;
}

/* Toggling the sidebar header content, hide the big heading [h3] and showing the small heading [strong] and vice versa*/
#sidebar .sidebar-header strong {
	display: none;
}
#sidebar.active .sidebar-header h3 {
	display: none;
}
#sidebar.active .sidebar-header strong {
	display: block;
}

#sidebar ul li a {
	text-align: left;
	text-decoration: none;
	color: #f5f5f5;
}

#sidebar ul li button {
	text-align: left;
	text-decoration: none;
	color: #f5f5f5;
}

#sidebar ul p {
	color: #fff;
	padding: 10px;
}

#sidebar ul li a {
	padding: 10px;
	font-size: 1.1em;
	display: block;
}
#sidebar ul li a:hover {
	background: rgb(23, 26, 29);
}

#sidebar ul li button {
	padding: 10px;
	font-size: 1.1em;
	display: block;
}
#sidebar ul li button:hover {
	background: rgb(23, 26, 29);
}

#sidebar ul li.active > a,
a[aria-expanded='true'] {
	color: #fff;
	background: #6d7fcc;
}

#sidebar.active ul li a {
	padding: 20px 10px;
	text-align: center;
	font-size: 0.85em;
}


#sidebar ul button.active > a, a[aria-expanded='true'] {
	color: #fff;
	background: #6d7fcc;
}

#sidebar.active ul li button {
	padding: 20px 10px;
	text-align: center;
	font-size: 0.85em;
}


#sidebar.active ul li a i {
	margin-right: 0;
	display: block;
	font-size: 1.8em;
	margin-bottom: 5px;
}

/* Same dropdown links padding*/
#sidebar.active ul ul a {
	padding: 10px !important;
}

/* Changing the arrow position to bottom center position,
   translateX(50%) works with right: 50%
   to accurately  center the arrow */
#sidebar.active a[aria-expanded='false']::before,
#sidebar.active a[aria-expanded='true']::before {
	top: auto;
	bottom: 5px;
	right: 50%;
	transform: translateX(50%);
}

#sidebar .submenu {
	list-style-type: none;
	background: rgb(30, 33, 36);
	margin: 0;
	padding: 0;
}
</style>
