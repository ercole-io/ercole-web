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
import moment from 'moment';

function getNewAlerts(page, severity, filter, startdate, enddate) {
	if (startdate != null) {
		startdate=moment(startdate).format("YYYY-MM-DD")
	}
	if (enddate != null) {
		enddate=moment(enddate).format("YYYY-MM-DD")
	}
	const config = {
		url: '/admin/api/alerts/search/findNEW',
		method: 'GET',
		params: {
			sort: 'date,desc',
			page: page - 1,
			severity: severity,
			search: filter,
			startdate: startdate,
			enddate: enddate
		}
	};
	return axios
		.request(config)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			Promise.reject(err);
		});
}

function getAlerts(page, severity, filter, startdate, enddate) {
	if (startdate != null) {
		startdate=moment(startdate).format("YYYY-MM-DD")
	}
	if (enddate != null) {
		enddate=moment(enddate).format("YYYY-MM-DD")
	}
	const config = {
		url: '/admin/api/alerts/search/findAll',
		method: 'GET',
		params: {
			sort: 'date,desc',
			page: page - 1,
			severity: severity,
			search: filter,
			startdate: startdate,
			enddate: enddate
		}
	};

	return axios
		.request(config)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			this.$noty.error('Unable retrieve alerts');
			Promise.reject(err);
		});
}

function updateAlerts(ids) {
	const config = {
		url: '/acknowledge',
		method: 'PUT',
		data: ids
	};
	return axios
		.request(config)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			this.$noty.error('Unable to update alerts status');
			Promise.reject(err);
		});
}

function getAlertByHost(hostname, page, severity) {
	const config = {
		url: '/admin/api/alerts/search/findByHostname',
		method: 'GET',
		params: {
			sort: 'date,desc',
			hostname,
			size: 5,
			page: page - 1,
			severity: severity
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
	getAlerts,
	updateAlerts,
	getNewAlerts,
	getAlertByHost
};
