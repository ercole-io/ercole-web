import axiosDefault from '../../axios/axios-default.js'

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
  getDashboardData({ dispatch }, token) {
    dispatch('onLoading')
    return new Promise((resolve, reject) => {
      axiosDefault
        .get('/frontend/dashboard', {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => {
          resolve(res)
        })
        .then(() => {
          dispatch('offLoading')
        })
        .catch(err => {
          reject(err)
          dispatch('offLoading')
          if (err.response.status === 401) {
            dispatch('logout')
          }
        })
    })
  }
}
