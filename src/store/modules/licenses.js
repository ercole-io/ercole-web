import axiosDefault from '@/axios/axios-default.js'

export const state = () => ({
  licenseList: []
})

export const getters = {
  getUsedLicenses: (state, getters, rootState) => {
    if (rootState.localFilters.hasFilters) {
      return state.licenseList.filterByKeys(rootState.localFilters.filters)
    } else {
      return state.licenseList
    }
  }
}

export const mutations = {
  SET_LICENSE_LIST: (state, payload) => {
    state.licenseList = payload
  }
}

export const actions = {
  async getLicensesList({ commit, getters }) {
    const licensesList = await axiosDefault.get(
      '/hosts/technologies/oracle/databases/consumed-licenses',
      {
        params: {
          'older-than': getters.getActiveFilters.date,
          environment: getters.getActiveFilters.environment,
          location: getters.getActiveFilters.location
        }
      }
    )
    const response = await licensesList.data

    commit('SET_LICENSE_LIST', response)
  }
}
