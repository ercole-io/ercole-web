import axiosDefault from '../../axios/axios-default.js'
import * as errorHandler from '../../helpers/errorHandler.js'

export const state = () => ({
  dashData: null
})

export const getters = {}

export const mutations = {
  SET_DASHBOARD_DATA: (state, payload) => {
    state.dashData = payload
  }
}

export const actions = {
  getDashboardData({ commit }, token) {
    return axiosDefault
      .get('/frontend/dashboard', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        console.log(res.data)
        commit('SET_DASHBOARD_DATA', res.data)
      })
      .catch(err => {
        errorHandler(err)
      })
  }
}
