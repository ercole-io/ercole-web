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
  getLicensesCompliance: (state, getters) => {
    return getters.filteredOrNot(state.complianceList)
  }
}

export const mutations = {
  SET_COMPLIANCE_LIST: (state, payload) => {
    const newPayload = []

    _.map(payload, val => {
      let full = ''
      if (val.licenseTypeID && val.itemDescription && val.metric) {
        full = `${val.licenseTypeID} - ${val.itemDescription} - ${val.metric}`
      }

      newPayload.push({
        ...val,
        compliance: val.compliance * 100,
        complianceStroke: showStrokeColor(val.compliance * 100),
        licenseAvailable: _.random(0, 10),
        fullPartNumber: full
      })
    })

    state.complianceList = newPayload
  }
}

export const actions = {
  async getComplianceList({ commit, getters }) {
    const complianceList = await axiosDefault.get(
      '/hosts/technologies/all/databases/licenses-compliance',
      {
        params: {
          'older-than': getters.getActiveFilters.date,
          environment: getters.getActiveFilters.environment,
          location: getters.getActiveFilters.location
        }
      }
    )
    const response = await complianceList.data.licensesCompliance

    commit('SET_COMPLIANCE_LIST', response)
  }
}
