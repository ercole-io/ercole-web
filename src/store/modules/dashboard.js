import axiosDefault from '../../axios/axios-default.js'
import * as errorHandler from '../../helpers/errorHandler.js'

export const state = () => ({
  totalTergets: null,
  technologies: null,
  notifications: null
})

export const getters = {}

export const mutations = {
  // SET_DASHBOARD_DATA: (state, payload) => {}
}

export const actions = {
  getDashboardData() {
    return new Promise((resolve, reject) => {
      axiosDefault
        .get('/frontend/dashboard')
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
          errorHandler(err)
        })
    })
  }
}
