import axiosDefault from '../../axios/axios-default.js'

export const state = () => ({
  licenseList: {}
})

export const getters = {}

export const mutations = {
  SET_LICENSE_LIST: (state, payload) => {
    state.licenseList = payload
  }
}

export const actions = {
  async getLicensesList({ commit }) {
    const licensesList = await axiosDefault.get('/licenses?mode=list')
    const response = await licensesList.data

    commit('SET_LICENSE_LIST', response)
  }
}
