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
  getDashboardData() {
    return axiosDefault.get('/frontend/dashboard').then(res => {
      console.log(res)
    })
  }
}
