import axiosDefault from '../../axios/axios-default.js'
// import router from '../../router/index.js'

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
  getDashboardData({ dispatch }) {
    return axiosDefault
      .get('/frontend/dashboard')
      .then(res => {
        console.log(res.data)
      })
      .then(() => {
        dispatch('offLoading')
      })
      .catch(err => {
        dispatch('offLoading')
        console.log(err)

        // if (err.response.status === 401) {
        //   router.replace('/login')
        // }
      })
  }
}
