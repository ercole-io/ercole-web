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

//@ts-check
import axios from 'axios';

/**
 * Return data for the first pie chart
 */
function getServerEnv(location) {
	const config = {
		url: '/stats/environments',
		method: 'GET',
		params: {
			location
		}
	};
	return axios
		.request(config)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return Promise.reject(err);
		});
}

/**
 * Returns all server location, it should be used
 * in the dashboard select item. Once selected should
 * trigger a page reload.
 */
function getServerLocations() {
	const config = {
		url: '/locations',
		method: 'GET'
	};

	return axios
		.request(config)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return Promise.reject(err);
		});
}

function getDBEnv(location) {
	const config = {
		url: '/stats/databases/environments',
		method: 'GET',
		params: {
			location
		}
	};

	return axios
		.request(config)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return Promise.reject(err);
		});
}

function getServerOS(location) {
	const config = {
		url: '/stats/operating-systems',
		method: 'GET',
		params: {
			location
		}
	};

	return axios
		.request(config)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return Promise.reject(err);
		});
}

function getServerType(location) {
	const config = {
		url: '/stats/types',
		method: 'GET',
		params: {
			location
		}
	};

	return axios
		.request(config)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return Promise.reject(err);
		});
}

function getDBFeatures(location) {
	const config = {
		url: '/getdbfeatures',
		method: 'GET',
		params: {
			location
		}
	};

	return axios
		.request(config)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return Promise.reject(err);
		});
}

function getDBVersions(location) {
	const config = {
		url: '/stats/databases/versions',
		method: 'GET',
		params: {
			location
		}
	};

	return axios
		.request(config)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return Promise.reject(err);
		});
}

/**
 * load data for top 5 hostname
 */
function getWorkTopFive(location) {
	const config = {
		url: '/stats/databases/top-workload',
		method: 'GET',
		params: {
			location
		}
	};

	return axios
		.request(config)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return Promise.reject(err);
		});
}

/**
 * load data for database top 5
 */
function getResizeTopFive(location) {
	const config = {
		url: '/stats/top-unused-instance-resource',
		method: 'GET',
		params: {
			location
		}
	};

	return axios
		.request(config)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return Promise.reject(err);
		});
}

function getLicensesCompliance() {
	const config = {
		url: '/getcompliance',
		method: 'GET'
	};
	return axios
		.request(config)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return Promise.reject(err);
		});
}

function getLicensesTypeSummary(location) {
	const config = {
		url: '/getlicenses',
		method: 'GET',
		params: {
			location
		}
	};

	return axios
		.request(config)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return Promise.reject(err);
		});
}

function getTopFifteenReclaimableDatabase(location) {
	const config = {
		url: '/stats/databases/top-reclaimable',
		method: 'GET',
		params: {
			location
		}
	};

	return axios
		.request(config)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return Promise.reject(err);
		});
}

function getPatchStatusStats(location, windowTime) {
	const config = {
		url: '/stats/databases/patch-status',
		method: 'GET',
		params: {
			location,
			windowTime
		}
	};

	return axios
		.request(config)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return Promise.reject(err);
		});
}

function getDataguardStatusStats(env) {
	const config = {
		url: '/stats/databases/dataguard-status',
		method: 'GET',
		params: {
			env: env,
		}
	};

	return axios
		.request(config)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return Promise.reject(err);
		});
}

function getRACStatusStats(env) {
	const config = {
		url: '/stats/databases/rac-status',
		method: 'GET',
		params: {
			environment: env,
		}
	};

	return axios
		.request(config)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return Promise.reject(err);
		});
}

function getArchiveLogStatusStats(env) {
	const config = {
		url: '/stats/databases/archivelog-status',
		method: 'GET',
		params: {
			environment: env,
		}
	};

	return axios
		.request(config)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return Promise.reject(err);
		});
}

function getTotalSegmentsSize(env) {
	const config = {
		url: '/stats/databases/total-segment-size',
		method: 'GET',
		params: {
			environment: env,
		}
	};

	return axios
		.request(config)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return Promise.reject(err);
		});
}

function getTotalDatafileSize(env) {
	const config = {
		url: '/stats/databases/total-datafile-size',
		method: 'GET',
		params: {
			environment: env,
		}
	};

	return axios
		.request(config)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return Promise.reject(err);
		});
}

function getTotalMemorySize(env) {
	const config = {
		url: '/stats/databases/total-memory-size',
		method: 'GET',
		params: {
			environment: env,
		}
	};

	return axios
		.request(config)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return Promise.reject(err);
		});
}

function getTotalWork(env) {
	const config = {
		url: '/stats/databases/total-work',
		method: 'GET',
		params: {
			environment: env,
		}
	};

	return axios
		.request(config)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return Promise.reject(err);
		});
}

function getAvailableTags() {
	const config = {
		url: '/settings/default-database-tag-choiches',
		method: 'GET'
	};

	return axios
		.request(config)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return Promise.reject(err);
		});
}

function getExadataStats() {
	const config = {
		url: '/stats/exadata',
		method: 'GET'
	};

	return axios
		.request(config)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return Promise.reject(err);
		});
}

function getExadataDevices() {
	const config = {
		url: '/exadata',
		method: 'GET'
	};

	return axios
		.request(config)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return Promise.reject(err);
		});
}

function getExadataTotalCPUStats() {
	const config = {
		url: '/stats/exadata/total-cpu',
		method: 'GET',
	};

	return axios
		.request(config)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return Promise.reject(err);
		});
}

function getExadataTotalMemorySizeStats() {
	const config = {
		url: '/stats/exadata/total-memory-size',
		method: 'GET',
	};

	return axios
		.request(config)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return Promise.reject(err);
		});
}

function getExadataAverageStorageUsageStats() {
	const config = {
		url: '/stats/exadata/average-storage-usage',
		method: 'GET',
	};

	return axios
		.request(config)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return Promise.reject(err);
		});
}

function getExadataStorageErrorCountStatusStats() {
	const config = {
		url: '/stats/exadata/storage-error-count-status',
		method: 'GET',
	};

	return axios
		.request(config)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return Promise.reject(err);
		});
}

function getExadataPatchStatusStats(windowTime) {
	const config = {
		url: '/stats/exadata/patch-status',
		method: 'GET',
		params: {
			'window-time': windowTime,
		}
	};

	return axios
		.request(config)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return Promise.reject(err);
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
	getLicensesTypeSummary,
	getLicensesCompliance,
	getTopFifteenReclaimableDatabase,
	getPatchStatusStats,
	getDataguardStatusStats,
	getRACStatusStats,
	getArchiveLogStatusStats,
	getTotalSegmentsSize,
	getTotalDatafileSize,
	getTotalMemorySize,
	getTotalWork,
	getAvailableTags,
	getExadataStats,
	getExadataDevices,
	getExadataTotalCPUStats,
	getExadataTotalMemorySizeStats,
	getExadataAverageStorageUsageStats,
	getExadataStorageErrorCountStatusStats,
	getExadataPatchStatusStats
};
