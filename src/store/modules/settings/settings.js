import { axiosRequest } from '@/services/services.js'

export const state = () => ({
  settings: [],
})

export const getters = {
  getAllSettings: (state) => {
    return state.settings
  },
  getDataService: (state) => {
    return state.settings.DataService
  },
  getAlertService: (state) => {
    return state.settings.AlertService
  },
  getAPIService: (state) => {
    return state.settings.APIService
  },
  getChartService: (state) => {
    return state.settings.ChartService
  },
  getThunderService: (state) => {
    return state.settings.ThunderService
  },
  getResourceFilePath: (state) => {
    return state.settings.ResourceFilePath
  },
}

export const mutations = {
  SET_SETTINGS: (state, payload) => {
    state.settings = payload
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
}
