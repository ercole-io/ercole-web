import axiosDefault from '@/axios/axios-default.js'

export const state = () => ({
  complianceList: []
})

export const getters = {
  getLicensesCompliance: state => {
    return state.complianceList
  }
}

export const mutations = {
  SET_COMPLIANCE_LIST: (state, payload) => {
    state.complianceList = payload
  }
}

export const actions = {
  async getComplianceList({ commit, getters }) {
    const complianceList = await axiosDefault.get(
      '/hosts/technologies/oracle/databases/licenses-compliance',
      {
        params: {
          'older-than': getters.getActiveFilters.date,
          environment: getters.getActiveFilters.environment,
          location: getters.getActiveFilters.location
        }
      }
    )
    const response = await complianceList.data

    commit('SET_COMPLIANCE_LIST', response)
  }
}
