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
		url: '/getserverenv',
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
		url: '/getserverslocations',
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
		url: '/getdbenv',
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
		url: '/getostypes',
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
		url: '/gethosttypes',
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
		url: '/getdbversions',
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
		url: '/getwork',
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
		url: '/getresize',
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
		url: '/gettopreclaimabledatabase',
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
		url: '/getpatchstatusstats',
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
	getExadataDevices
};
