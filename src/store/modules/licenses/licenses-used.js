import axiosDefault from '@/axios/axios-default.js'
import _ from 'lodash'

export const state = () => ({
  licenseList: []
})

export const getters = {
  getUsedLicenses: (state, getters) => {
    return getters.filteredOrNot(state.licenseList)
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
      '/hosts/technologies/all/databases/licenses-used',
      {
        params: {
          'older-than': getters.getActiveFilters.date,
          environment: getters.getActiveFilters.environment,
          location: getters.getActiveFilters.location
        }
      }
    )
    const response = await licensesList.data.usedLicenses

    let setLicensesInfo = _.map(response, val => {
      return {
        ...val,
        description: getters.returnMetricAndDescription(val.licenseTypeID)
          .description,
        metric: getters.returnMetricAndDescription(val.licenseTypeID).metric
      }
    })

    commit('SET_LICENSE_LIST', setLicensesInfo)
  }
}
