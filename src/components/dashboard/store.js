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

import DashboardService from '@/services/DashboardService';
import { mapArrayToPieChartData } from '@/utils/PieChartMapper';

function factory(loadData) {
	const proto = {
		namespaced: true,
		state: {
			data: [],
			view: ''
		},
		mutations: {
			load: state => {
				state.data = [];
				state.view = 'spinner';
			},
			success: (state, data) => {
				state.data = data;
				state.view = 'widget';
			},
			error: state => {
				state.data = [];
				state.view = 'alert';
			}
		},
		getters: {
			data: state => {
				return state.data;
			},
			spinner: state => {
				return state.view === 'spinner';
			},
			alert: state => {
				return state.view === 'alert';
			},
			widget: state => {
				return state.view === 'widget';
			}
		},
		actions: {
			loadData
		}
	};

	return Object.create(proto);
}

const dashboard = {
	namespaced: 'true',
	modules: {
		serverEnvironmentChart: factory(function({ commit }, location) {
			commit('load');
			return DashboardService.getServerEnv(location)
				.then(res => {
					const data = mapArrayToPieChartData(res, ['label', 'data']);
					commit('success', data);
				})
				.catch(() => {
					commit('error');
				});
		}),
		operatingSystemChart: factory(function({ commit }, location) {
			commit('load');
			return DashboardService.getServerOS(location)
				.then(res => {
					const data = mapArrayToPieChartData(res, ['sistemi', 'count']);
					commit('success', data);
				})
				.catch(() => {
					commit('error');
				});
		}),
		serverTypeChart: factory(function({ commit }, location) {
			commit('load');
			return DashboardService.getServerType(location)
				.then(res => {
					const data = mapArrayToPieChartData(res, ['tipo', 'count']);
					commit('success', data);
				})
				.catch(() => {
					commit('error');
				});
		}),
		databaseTypeChart: factory(function({ commit }, location) {
			commit('load');
			return DashboardService.getDBEnv(location)
				.then(res => {
					const data = mapArrayToPieChartData(res, ['environment', 'count']);
					commit('success', data);
				})
				.catch(() => {
					commit('error');
				});
		}),
		databaseVersionChart: factory(function({ commit }, location) {
			commit('load');
			return DashboardService.getDBVersions(location)
				.then(res => {
					const data = mapArrayToPieChartData(res, ['version', 'count']);
					commit('success', data);
				})
				.catch(() => {
					commit('error');
				});
		}),
		topFiveWork: factory(function({ commit }, location) {
			commit('load');
			return DashboardService.getWorkTopFive(location)
				.then(res => {
					commit('success', res);
				})
				.catch(() => {
					commit('error');
				});
		}),
		topFiveResize: factory(function({ commit }, location) {
			commit('load');
			return DashboardService.getResizeTopFive(location)
				.then(res => {
					commit('success', res);
				})
				.catch(() => {
					commit('error');
				});
		}),
		topReclaimableDatabaseChart: factory(function({ commit }, location) {
			commit('load');
			return DashboardService.getTopFifteenReclaimableDatabase(location)
				.then(res => {
					const data = mapArrayToPieChartData(res, ['dbname', 'sum']);
					commit('success', data);
				})
				.catch(() => {
					commit('error');
				});
		}),
		patchStatusChart: factory(function({ commit }, location) {
			commit('load');
			return DashboardService.getPatchStatusStats(location, 6)
				.then(res => {
					const data = mapArrayToPieChartData(res, ['status', 'count']);
					data.labels.forEach(function (item, index) {
						if (item === 'KO') {
							data.datasets[0].backgroundColor[index] = '#ff0000';
						} else if  (item === 'OK') {
							data.datasets[0].backgroundColor[index] = '#0000ff';
						}
					})
					commit('success', data);
				})
				.catch(() => {
					commit('error');
				});
		}),
		patchStatusChart12: factory(function({ commit }, location) {
			commit('load');
			return DashboardService.getPatchStatusStats(location, 12)
				.then(res => {
					const data = mapArrayToPieChartData(res, ['status', 'count']);
					data.labels.forEach(function (item, index) {
						if (item === 'KO') {
							data.datasets[0].backgroundColor[index] = '#ff0000';
						} else if  (item === 'OK') {
							data.datasets[0].backgroundColor[index] = '#0000ff';
						}
					})
					commit('success', data);
				})
				.catch(() => {
					commit('error');
				});
		}),
	},
	state: {
		isUpdating: false,
		location: null
	},
	mutations: {
		updateComplete(state) {
			state.isUpdating = false;
		},
		startUpdate(state, location) {
			state.isUpdating = true;
			state.location = location;
		}
	},
	getters: {
		isUpdating: state => {
			return state.isUpdating;
		},
		location: state => {
			return state.location;
		}
	},
	actions: {
		updateWidgets({ commit, dispatch }, location) {
			commit('startUpdate', location);
			Promise.all([
				dispatch('serverEnvironmentChart/loadData', location),
				dispatch('operatingSystemChart/loadData', location),
				dispatch('serverTypeChart/loadData', location),
				dispatch('databaseTypeChart/loadData', location),
				dispatch('databaseVersionChart/loadData', location),
				dispatch('topFiveWork/loadData', location),
				dispatch('topFiveResize/loadData', location),
				dispatch('topReclaimableDatabaseChart/loadData', location),
				dispatch('patchStatusChart/loadData', location),
				dispatch('patchStatusChart12/loadData', location)
			])
				.then(() => {
					commit('updateComplete');
				})
				.catch(() => {
					commit('updateComplete');
				});
		}
	}
};

export default dashboard;
