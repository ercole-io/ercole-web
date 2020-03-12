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

import DashboardService from "@/services/DashboardService";
import { mapArrayToPieChartData } from "@/utils/PieChartMapper";

function factory(loadData) {
  const proto = {
    namespaced: true,
    state: {
      data: [],
      view: ""
    },
    mutations: {
      load: state => {
        state.data = [];
        state.view = "spinner";
      },
      success: (state, data) => {
        state.data = data;
        state.view = "widget";
      },
      error: state => {
        state.data = [];
        state.view = "alert";
      }
    },
    getters: {
      data: state => {
        return state.data;
      },
      spinner: state => {
        return state.view === "spinner";
      },
      alert: state => {
        return state.view === "alert";
      },
      widget: state => {
        return state.view === "widget";
      }
    },
    actions: {
      loadData
    }
  };

  return Object.create(proto);
}

const dashboard = {
  namespaced: "true",
  modules: {
    serverEnvironmentChart: factory(function({ commit }, info) {
      commit("load");
      return DashboardService.getServerEnv(info.backendConfig, info.location)
        .then(res => {
          const data = mapArrayToPieChartData(res, ["Environment", "Count"]);
          commit("success", data);
        })
        .catch(() => {
          commit("error");
        });
    }),
    operatingSystemChart: factory(function({ commit }, info) {
      commit("load");
      return DashboardService.getServerOS(info.backendConfig, info.location)
        .then(res => {
          const data = mapArrayToPieChartData(res, [
            "OperatingSystem",
            "Count"
          ]);
          commit("success", data);
        })
        .catch(() => {
          commit("error");
        });
    }),
    serverTypeChart: factory(function({ commit }, info) {
      commit("load");
      return DashboardService.getServerType(info.backendConfig, info.location)
        .then(res => {
          const data = mapArrayToPieChartData(
            res.map(item => {
              if (item.tipo == "PH") {
                item.tipo = "BARE METAL";
              }
              return item;
            }),
            ["Type", "Count"]
          );
          commit("success", data);
        })
        .catch(() => {
          commit("error");
        });
    }),
    databaseTypeChart: factory(function({ commit }, info) {
      commit("load");
      return DashboardService.getDBEnv(info.backendConfig, info.location)
        .then(res => {
          const data = mapArrayToPieChartData(res, ["Environment", "Count"]);
          commit("success", data);
        })
        .catch(() => {
          commit("error");
        });
    }),
    databaseVersionChart: factory(function({ commit }, info) {
      commit("load");
      return DashboardService.getDBVersions(info.backendConfig, info.location)
        .then(res => {
          const data = mapArrayToPieChartData(res, ["Version", "Count"]);
          commit("success", data);
        })
        .catch(() => {
          commit("error");
        });
    }),
    topFiveWork: factory(function({ commit }, info) {
      commit("load");
      return DashboardService.getWorkTopFive(info.backendConfig, info.location)
        .then(res => {
          commit("success", res);
        })
        .catch(() => {
          commit("error");
        });
    }),
    topFiveResize: factory(function({ commit }, info) {
      commit("load");
      return DashboardService.getResizeTopFive(
        info.backendConfig,
        info.location
      )
        .then(res => {
          commit("success", res);
        })
        .catch(() => {
          commit("error");
        });
    }),
    topReclaimableDatabaseChart: factory(function({ commit }, info) {
      commit("load");
      return DashboardService.getTopFifteenReclaimableDatabase(
        info.backendConfig,
        info.location
      )
        .then(res => {
          const data = mapArrayToPieChartData(res, [
            "Dbname",
            "ReclaimableSegmentAdvisors"
          ]);
          commit("success", data);
        })
        .catch(() => {
          commit("error");
        });
    }),
    patchStatusChart: factory(function({ commit }, info) {
      commit("load");
      return DashboardService.getPatchStatusStats(
        info.backendConfig,
        info.location,
        6
      )
        .then(res => {
          const data = mapArrayToPieChartData(res, ["Status", "Count"]);
          data.labels.forEach(function(item, index) {
            if (item === "KO") {
              data.datasets[0].backgroundColor[index] = "#ff0000";
            } else if (item === "OK") {
              data.datasets[0].backgroundColor[index] = "#0000ff";
            }
          });
          commit("success", data);
        })
        .catch(() => {
          commit("error");
        });
    }),
    patchStatusChart12: factory(function({ commit }, info) {
      commit("load");
      return DashboardService.getPatchStatusStats(
        info.backendConfig,
        info.location,
        12
      )
        .then(res => {
          const data = mapArrayToPieChartData(res, ["Status", "Count"]);
          data.labels.forEach(function(item, index) {
            if (item === "KO") {
              data.datasets[0].backgroundColor[index] = "#ff0000";
            } else if (item === "OK") {
              data.datasets[0].backgroundColor[index] = "#0000ff";
            }
          });
          commit("success", data);
        })
        .catch(() => {
          commit("error");
        });
    })
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
    },
    backendConfig: (state, getters, rootState, rootGetters) => {
      return rootGetters.backendConfig;
    }
  },
  actions: {
    updateWidgets({ commit, dispatch, getters }, location) {
      commit("startUpdate", location);

      Promise.all([
        dispatch("serverEnvironmentChart/loadData", {
          location,
          backendConfig: getters.backendConfig
        }),
        dispatch("operatingSystemChart/loadData", {
          location,
          backendConfig: getters.backendConfig
        }),
        dispatch("serverTypeChart/loadData", {
          location,
          backendConfig: getters.backendConfig
        }),
        dispatch("databaseTypeChart/loadData", {
          location,
          backendConfig: getters.backendConfig
        }),
        dispatch("databaseVersionChart/loadData", {
          location,
          backendConfig: getters.backendConfig
        }),
        dispatch("topFiveWork/loadData", {
          location,
          backendConfig: getters.backendConfig
        }),
        dispatch("topFiveResize/loadData", {
          location,
          backendConfig: getters.backendConfig
        }),
        dispatch("topReclaimableDatabaseChart/loadData", {
          location,
          backendConfig: getters.backendConfig
        }),
        dispatch("patchStatusChart/loadData", {
          location,
          backendConfig: getters.backendConfig
        }),
        dispatch("patchStatusChart12/loadData", {
          location,
          backendConfig: getters.backendConfig
        })
      ])
        .then(() => {
          commit("updateComplete");
        })
        .catch(() => {
          commit("updateComplete");
        });
    }
  }
};

export default dashboard;
