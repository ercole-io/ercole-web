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
	<div class="container-fluid">
		<div class="row">
			<div class="col-8">
				<SiteLocator></SiteLocator>
			</div>
			<div class="col-4">
				<div class="card mb-3">
					<div class="card-body">
						<LicenseCompliance></LicenseCompliance>
					</div>
				</div>
			</div>
		</div>
		<!-- end of row -->
		<div class="row">
			<div class="col">
				<h3>HOSTS</h3>
				<div class="row">
					<div class="col-4">
						<div class="card mb-3">
							<div class="card-body">
								<ServerEnvironmentChart></ServerEnvironmentChart>
							</div>
						</div>
					</div>
					<div class="col-4">
						<div class="card mb-3">
							<div class="card-body">
								<OperatingSystemChart></OperatingSystemChart>
							</div>
						</div>
					</div>
					<div class="col-4">
						<div class="card mb-3">
							<div class="card-body">
								<ServerTypeChart></ServerTypeChart>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- end of row -->
		<div class="row">
			<div class="col">
				<h3>Oracle Database Instances</h3>
				<div class="row">
					<div class="col-6">
						<div class="card mb-3">
							<div class="card-body">
								<DatabaseTypeChart></DatabaseTypeChart>
							</div>
						</div>
					</div>
					<div class="col-6">
						<div class="card mb-3">
							<div class="card-body">
								<DatabaseVersionChart></DatabaseVersionChart>
							</div>
						</div>
					</div>
					<div class="col-4">
						<div class="card mb-3">
							<div class="card-body">
								<TopReclaimableDatabaseChart></TopReclaimableDatabaseChart>
							</div>
						</div>
					</div>
					<div class="col-4">
						<div class="card mb-3">
							<div class="card-body">
								<PatchStatusChart></PatchStatusChart>
							</div>
						</div>
					</div>
					<div class="col-4">
						<div class="card mb-3">
							<div class="card-body">
								<PatchStatusChart12></PatchStatusChart12>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- end of row -->
		<div class="row">
			<div class="col">
				<div class="card mb-3">
					<div class="card-body">
						<TopFiveWork></TopFiveWork>
					</div>
				</div>
				<!-- end of card -->
			</div>
			<div class="col">
				<div class="card mb-3">
					<div class="card-body">
						<TopFiveResize></TopFiveResize>
					</div>
				</div>
				<!-- end of card -->
			</div>
		</div>
		<!-- end of row -->
	</div>
</template>

<script>
import ServerEnvironmentChart from '@/components/dashboard/ServerEnvironmentChart.vue';
import OperatingSystemChart from '@/components/dashboard/OperatingSystemChart.vue';
import ServerTypeChart from '@/components/dashboard/ServerTypeChart.vue';
import DatabaseVersionChart from '@/components/dashboard/DatabaseVersionChart.vue';
import DatabaseTypeChart from '@/components/dashboard/DatabaseTypeChart.vue';
import LicenseCompliance from '@/components/dashboard/LicenseCompliance.vue';
import TopReclaimableDatabaseChart from '@/components/dashboard/TopReclaimableDatabaseChart.vue';
import PatchStatusChart from '@/components/dashboard/PatchStatusChart.vue';
import PatchStatusChart12 from '@/components/dashboard/PatchStatusChart12.vue';
import TopFiveResize from '@/components/dashboard/TopFiveResize';
import TopFiveWork from '@/components/dashboard/TopFiveWork';
import SiteLocator from '@/components/dashboard/SiteLocator';


export default {
	components: {
		ServerEnvironmentChart,
		OperatingSystemChart,
		ServerTypeChart,
		DatabaseVersionChart,
		DatabaseTypeChart,
		TopFiveResize,
		TopFiveWork,
		TopReclaimableDatabaseChart,
		PatchStatusChart,
		PatchStatusChart12,
		SiteLocator,
		LicenseCompliance
	}
};
</script>

<style scoped>
</style>
