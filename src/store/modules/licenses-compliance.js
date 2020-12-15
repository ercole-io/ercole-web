import axiosDefault from '@/axios/axios-default.js'
import _ from 'lodash'

const showStrokeColor = value => {
  if (value < 100 && value >= 80) {
    return 'is-warning'
  } else if (value < 80) {
    return 'is-danger'
  } else {
    return 'is-success'
  }
}

export const state = () => ({
  complianceList: []
})

export const getters = {
  getLicensesCompliance: state => {
    const result = []

    _.map(state.complianceList, val => {
      result.push({
        partID: val.partID,
        itemDescription: val.itemDescription,
        metric: val.metric,
        consumed: val.consumed,
        covered: val.covered,
        complianveValue: (val.compliance *= 100),
        complianceStroke: showStrokeColor(val.compliance),
        unlimited: val.unlimited
      })
    })

    return result
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
