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

/*eslint-disable */

// mock function for  dashboard(1)
function getServerEnv(location) {
	return new Promise(function(resolve, reject) {
		setTimeout(() => {
			resolve([
				{ label: 'PRD', data: 78 },
				{ label: 'TST', data: 48 },
				{ label: 'TRN', data: 0 },
				{ label: 'COL', data: 11 },
				{ label: 'SVL', data: 20 },
				{ label: 'PRE', data: 29 }
			]);
		}, 2500 * Math.random());
	});
}

// locations switcher mock function
function getServerLocations() {
	return new Promise(function(resolve, reject) {
		setTimeout(() => {
			resolve(['Germany', 'Italy']);
		},2500* Math.random())
	});
}

// mock function for  dashboard(4)
function getDBEnv() {
	return new Promise(function(resolve, reject) {
		setTimeout(() => {
			resolve([
				{ environment: 'PRD', count: 78 },
				{ environment: 'TST', count: 48 },
				{ environment: 'TRN', count: 0 },
				{ environment: 'COL', count: 11 },
				{ environment: 'SVL', count: 20 },
				{ environment: 'PRE', count: 29 }
			]);
		},2500* Math.random())
	});
}

// mock function for  dashboard(2)
function getServerOS() {
	return new Promise(function(resolve, reject) {
		setTimeout(() => {
			resolve([
				{ sistemi: 'RH5', count: 20 },
				{ sistemi: 'RH6', count: 24 },
				{ sistemi: 'RH7', count: 30 },
				{ sistemi: 'SUSE', count: 0 },
				{ sistemi: 'HPUX', count: 7 },
				{ sistemi: 'WINDOWS', count: 20 }
			]);
		},2500* Math.random())
	});
}

// mock function for  dashboard(3)
function getServerType() {
	return new Promise(function(resolve, reject) {
		setTimeout(() => {
			resolve([
				{ tipo: 'OVM', count: 7 },
				{ tipo: 'VMWARE', count: 40 },
				{ tipo: 'PH', count: 50 },
				{ tipo: 'HPVRT', count: 15 },
				{ tipo: 'LPAR', count: 10 }
			]);
		},2500* Math.random())
	});
}

// mock function for  dashboard(9)
function getDBFeatures() {
	return new Promise(function(resolve, reject) {
		setTimeout(() => {
			const data = [
				{ label: 'Tuning', data: 191 },
				{ label: 'RAC', data: 80 },
				{ label: 'Partitioning', data: 193 },
				{ label: 'Goldegate', data: 120 },
				{ label: 'Diagnostic Pack', data: 199 },
				{ label: 'Adv. Security', data: 5 },
				{ label: 'Adv. Compression', data: 20 }
			];
			resolve(data);
		},2500* Math.random())
	});

}

// mock function for  dashboard(5)
function getDBVersions() {
	return new Promise(function(resolve, reject) {
		setTimeout(() => {
			resolve([
				{ version: '9i', count: 4 },
				{ version: '10g', count: 7 },
				{ version: '11g', count: 30 },
				{ version: '12c', count: 40 }
			]);
		},2500* Math.random())
	});
}

/**
 * carica i dati per la top 5 degli Hostname
 */
function getWorkTopFive() {
	return new Promise(function(resolve, reject) {
		setTimeout(() => {
			resolve([
				{ database: 'DB1', hostname: 'db1.local', work: '8' },
				{ database: 'DB2', hostname: 'db2.local', work: '8' },
				{ database: 'DB3', hostname: 'db3.local', work: '7' },
				{ database: 'DB4', hostname: 'db4.local', work: '7' },
				{ database: 'DB5', hostname: 'db5.local', work: '6' }
			]);
		},2500* Math.random())
	});
}
/**
 * carica i dati per la top 5 dei Database
 */
function getResizeTopFive() {
	return new Promise(function(resolve, reject) {
		setTimeout(() => {
			resolve([
				{ resize: 1, hostname: 'db1.local' },
				{ resize: 8, hostname: 'db1.local' },
				{ resize: 7, hostname: 'db1.local' },
				{ resize: 5, hostname: 'db1.local' },
				{ resize: 4, hostname: 'db1.local' }
			]);
		},2500* Math.random())
	});
}

// mock function for  dashboard(8)
function getLicensesTypeSummary() {
	return new Promise(function(resolve, reject) {
		setTimeout(() => {
			resolve([
				{
					type: 'Enterprise',
					counter: 20
				},
				{
					type: 'Standard',
					counter: 10
				}
			]);
		},2500* Math.random())
	});
}

export default {
	getServerEnv,
	getServerLocations,
	getDBEnv,
	getServerOS,
	getServerType,
	getDBFeatures,
	getDBVersions,
	getWorkTopFive,
	getResizeTopFive,
	getLicensesTypeSummary
};

/*eslint-enable */
