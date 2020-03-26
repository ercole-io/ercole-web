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

import Vue from "vue";
import Vuex from "vuex";
import AlertService from "@/services/AlertService.js";

import dashboard from "@/components/dashboard/store";

Vue.use(Vuex);

function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};


const store = new Vuex.Store({
  // eslint-disable-next-line
	strict: process.env.NODE_ENV !== 'production',
  modules: {
    dashboard
  },
  state: {
    sidebarVisible: true,
    notifications: [],
    totalNotifications: 0,
    backendConfig: {
      baseURL: "<<<URL>>>$API_URL<<<_URL>>>",
      headers: {}
    },
    token: "",
    username: ""
  },
  getters: {
    sidebarVisible: state => {
      return state.sidebarVisible;
    },
    notifications: state => {
      return state.notifications;
    },
    totalNotifications: state => {
      return state.totalNotifications;
    },
    backendConfig: state => {
      return state.backendConfig;
    },
    token: state => {
      return state.token;
    },
    username: state => {
      return state.username;
    },
  },
  mutations: {
    toggleSidebar: state => {
      state.sidebarVisible = !state.sidebarVisible;
    },
    setNotifications: (state, payload) => {
      state.notifications = payload.notifications;
      state.totalNotifications = payload.total;
    },
    setToken: (state, token) => {
      state.backendConfig.headers["Authorization"] = "Bearer " + token;
      state.token = token;
      state.username = parseJwt(token)["sub"];
    },
    removeToken: state => {
      delete state.backendConfig.headers["Authorization"];
      state.token = "";
      state.username = "";
    },
    init: state => {
      if (state.backendConfig.baseURL.includes("$API_URL")) {
        state.backendConfig.baseURL = "http://127.0.0.1:11113";
      } else {
        state.backendConfig.baseURL = state.backendConfig.baseURL.substring(state.backendConfig.baseURL.indexOf("<<<URL>>>")+"<<<URL>>>".length, state.backendConfig.baseURL.indexOf("<<<_URL>>>"));
      }
    }
  },
  actions: {
    loadNotifications({ commit, getters }) {
      AlertService.getNewAlerts(getters.backendConfig, 1)
        .then(res => {
          commit("setNotifications", {
            notifications: res.Content,
            total: res.Metadata.TotalElements
          });
        })
        .catch(() => {
          this.$noty.error("Unable retrieve alerts");
        });
    }
  }
});

export default store;
