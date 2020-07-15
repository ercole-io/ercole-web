import axiosNoauth from '../../axios/axios-noauth.js'

export const state = () => {
  return {
    config: null
  }
}

export const getters = {
  isConfigLoaded: state => state.config !== null,
  getAPIServiceBaseURL: state => state.config.APIServiceBaseUrl
}

export const mutations = {
  FETCHED_CONFIG: (state, payload) => {
    state.config = payload
  }
}

export const actions = {
  fetchConfig({ commit, dispatch }) {
    return axiosNoauth
      .get('/config.json')
      .then(res => {
        commit('FETCHED_CONFIG', res.data)
      })
      .catch(err => {
        const errorMessage = err.response.data.ErrorDescription
        commit('FETCHED_CONFIG', {})
        dispatch('setErrMsg', errorMessage)
      })
  }
}
