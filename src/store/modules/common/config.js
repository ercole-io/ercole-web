import axiosConfig from '@/axios/axios-config.js'

export const state = () => {
  return {
    config: null,
  }
}

export const getters = {
  isConfigLoaded: (state) => state.config !== null,
  getAPIServiceBaseURL: (state) => state.config.APIServiceBaseUrl,
  getChartServiceBaseUrl: (state) => state.config.ChartServiceBaseUrl,
  getOracleCloudInfraUrl: (state) => state.config.ThunderServiceBaseUrl,
  getRepoServiceBaseUrl: (state) => state.config.RepoServiceBaseUrl,
}

export const mutations = {
  FETCHED_CONFIG: (state, payload) => {
    state.config = payload
  },
}

export const actions = {
  fetchConfig({ commit, dispatch }) {
    return axiosConfig
      .get('/config.json')
      .then((res) => {
        commit('FETCHED_CONFIG', res.data)
      })
      .catch((err) => {
        const errorMessage = err.response.data.ErrorDescription
        commit('FETCHED_CONFIG', {})
        dispatch('setErrMsg', errorMessage)
      })
  },
}
