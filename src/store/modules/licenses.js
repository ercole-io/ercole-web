import axiosDefault from '../../axios/axios-default.js'

export const state = () => ({
  licenseList: []
})

export const getters = {
  getUsedLicenses: state => {
    return state.licenseList
  }
}

export const mutations = {
  SET_LICENSE_LIST: (state, payload) => {
    state.licenseList = payload
  }
}

export const actions = {
  async getLicensesList({ commit }) {
    const loc = JSON.parse(localStorage.getItem('globalFilters')).location
    const env = JSON.parse(localStorage.getItem('globalFilters')).environment
    const date = JSON.parse(localStorage.getItem('globalFilters')).date

    const licensesList = await axiosDefault.get(
      '/hosts/technologies/oracle/databases/consumed-licenses',
      {
        params: {
          'older-than': date,
          environment: env,
          location: loc
        }
      }
    )
    const response = await licensesList.data

    commit('SET_LICENSE_LIST', response)
  }
}
