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

import axios from 'axios';

function getHosts(pageNumber, filter, olderThan, sort) {
	const config = {
		//url: '/admin/api/currentHosts',
		url: '/hosts',
		method: 'GET',
		params: {
			page: pageNumber - 1,
			size: 20,
			sort: sort,
			ricerca: filter,
			days: olderThan
		}
	};

	return axios
		.request(config)
		.then(res => {
			const page = res.data;
			return {
				number: page.number,
				numberOfElements: page.totalElements,
				size: page.size,
				totalPages: page.totalPages,
				content: res.data.content
			};
		})
		.catch(err => {
			return Promise.reject(err);
		});
}

function getHost(id) {
	const config = {
		url: '/admin/api/currentHosts/search/findByHostname?hostname=' + id,
		method: 'GET'
	};

	return axios
		.request(config)
		.then(res => {
			const host = res.data;
			return host;
		})
		.catch(err => {
			return Promise.reject(err);
		});
}

function getHostHistory(host, date) {
	const config = {
		method: 'GET',
		url: '/historical',
		params: {
			hostname: host,
			data: date
		}
	};
	return axios
		.request(config)
		.then(res => {
			if (res.status === 204) {
				return Promise.reject('No historical data');
			}
			const host = res.data;
			return host;
		})
		.catch(err => {
			return Promise.reject(err);
		});
}

function getAddms(filter, env) {
	const config = {
		method: 'GET',
		url: '/getalladdms',
		params: {
			search: filter,
			env: env
		}
	};
	return axios
		.request(config)
		.then(res => {
			const addms = res.data;
			return addms;
		})
		.catch(err => {
			return Promise.reject(err);
		});
}

function getSegmentAdvisors(filter, env) {
	const config = {
		method: 'GET',
		url: '/getallsegmentadvisors',
		params: {
			search: filter,
			env: env
		}
	};
	return axios
		.request(config)
		.then(res => {
			const segmentAdvisors = res.data;
			return segmentAdvisors;
		})
		.catch(err => {
			return Promise.reject(err);
		});
}

function getPatchAdvisors(status, windowTime) {
	const config = {
		method: 'GET',
		url: '/getallpatchadvisors',
		params: {
			status: status,
			windowTime: windowTime
		}
	};
	return axios
		.request(config)
		.then(res => {
			const patchAdvisors = res.data;
			return patchAdvisors;
		})
		.catch(err => {
			return Promise.reject(err);
		});
}

function getEnviroments() {
	const config = {
		method: 'GET',
		url: '/environments'
	};
	return axios
		.request(config)
		.then(res => {
			const envs = res.data;
			return envs;
		})
		.catch(err => {
			return Promise.reject(err);
		});
}

function generateEx() {
	return axios({
		url: '/generateexcel',
		method: 'GET',
		responseType: 'blob'
	}).then(response => {
		const url = window.URL.createObjectURL(new Blob([response.data]));
		const link = document.createElement('a');
		link.href = url;
		link.setAttribute('download', 'Hosts.xlsm'); //or any other extension
		document.body.appendChild(link);
		link.click();
	});
}

function generateExSimple() {
	return axios({
		url: '/generateexcelraw',
		method: 'GET',
		responseType: 'blob'
	}).then(response => {
		const url = window.URL.createObjectURL(new Blob([response.data]));
		const link = document.createElement('a');
		link.href = url;
		link.setAttribute('download', 'Hosts.xlsx'); //or any other extension
		document.body.appendChild(link);
		link.click();
	});
}


function generatePatchAdvisorExcel(status, windowTime) {
	return axios({
		url: '/generate-patch-excel',
		method: 'GET',
		responseType: 'blob',
		params: {
			status: status,
			windowTime: windowTime
		}
	}).then(response => {
		const url = window.URL.createObjectURL(new Blob([response.data]));
		const link = document.createElement('a');
		link.href = url;
		link.setAttribute('download', 'Patches.xlsm'); //or any other extension
		document.body.appendChild(link);
		link.click();
	});
}

function generateSegmentsExcel(filter, env) {
	return axios({
		url: '/generate-segment-excel',
		method: 'GET',
		responseType: 'blob',
		params: {
			search: filter,
			env: env
		}
	}).then(response => {
		const url = window.URL.createObjectURL(new Blob([response.data]));
		const link = document.createElement('a');
		link.href = url;
		link.setAttribute('download', 'Segments.xlsm'); //or any other extension
		document.body.appendChild(link);
		link.click();
	});
}

function generateAddmExcel(filter, env) {
	return axios({
		url: '/generate-addm-excel',
		method: 'GET',
		responseType: 'blob',
		params: {
			search: filter,
			env: env
		}
	}).then(response => {
		const url = window.URL.createObjectURL(new Blob([response.data]));
		const link = document.createElement('a');
		link.href = url;
		link.setAttribute('download', 'Addms.xlsm'); //or any other extension
		document.body.appendChild(link);
		link.click();
	});
}

function dismiss(hostname) {
	return axios({
		url: '/hosts/' + hostname,
		method: 'DELETE'
	})
}

function getGrowDbStats(hostname) {
	const config = {
		url: '/hosts/' + hostname + '/useddatahistory',
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

function getSegmentsSizeGrowDbStats(hostname) {
	const config = {
		url: '/hosts/' + hostname + '/segmentssizedatahistory',
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

function getDatabases(pageNumber, sort, filter) {
	const config = {
		url: '/databases',
		method: 'GET',
		params: {
			page: pageNumber - 1,
			size: 50,
			sort: sort,
			search: filter
		}
	};

	return axios
		.request(config)
		.then(res => {
			const page = res.data;
			return {
				number: page.number,
				numberOfElements: page.totalElements,
				size: page.size,
				totalPages: page.totalPages,
				content: res.data.content
			};
		})
		.catch(err => {
			return Promise.reject(err);
		});
}

function getTagsGroupedByDbname(hostname) {
	const config = {
		url: '/hosts/' + hostname + '/tags',
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

function addTag(hostname, dbname, tag) {
	return axios({
		url: '/hosts/' + hostname + '/databases/' + dbname + '/tags',
		headers: {
			'Content-Type': 'application/json',
		},
		method: 'POST',
		data: tag
	})
}

function deleteTag(tag) {
	return axios({
		url: '/hosts/' + tag.hostname + '/databases/' + tag.dbname + '/tags/' + tag.id,
		method: 'DELETE'
	})
}


export default {
	getHost,
	getHosts,
	getHostHistory,
	generateEx,
	generateExSimple,
	getAddms,
	getEnviroments,
	getSegmentAdvisors,
	getPatchAdvisors,
	generatePatchAdvisorExcel,
	generateSegmentsExcel,
	generateAddmExcel,
	getGrowDbStats,
	getSegmentsSizeGrowDbStats,
	dismiss,
	getDatabases,
	getTagsGroupedByDbname,
	addTag,
	deleteTag
};