import { axiosRequest } from '@/services/services.js'

export const state = () => ({
  allSettings: {},
})

export const getters = {
  getAPIService: (state) => {
    return state.allSettings.APIService
  },
  getAlertService: (state) => {
    return state.allSettings.AlertService
  },
  getChartService: (state) => {
    return state.allSettings.ChartService
  },
  getDataService: (state) => {
    return state.allSettings.DataService
  },
  getResourceFilePath: (state) => {
    return state.allSettings.ResourceFilePath
  },
  getThunderService: (state) => {
    return state.allSettings.ThunderService
  },
}

export const mutations = {
  SET_SETTINGS: (state, payload) => {
    state.allSettings = payload
  },
}

export const actions = {
  async requestSettings({ commit }) {
    const config = {
      method: 'get',
      url: '/configuration',
    }
    await axiosRequest('baseApi', config).then((res) => {
      commit('SET_SETTINGS', res.data)
    })
  },
  async saveSettings({ dispatch }, data) {
    const config = {
      method: 'post',
      url: '/configuration',
      data: data,
    }
    await axiosRequest('baseApi', config).then(() => {
      dispatch('requestSettings')
    })
  },
}
