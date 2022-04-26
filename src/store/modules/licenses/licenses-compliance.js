import axiosNoLoading from '@/axios/axios-no-loading.js'
import _ from 'lodash'
import { setFullPartNumber } from '@/helpers/helpers.js'

const showStrokeColor = (value) => {
  if (value < 100 && value >= 80) {
    return 'is-warning'
  } else if (value < 80) {
    return 'is-danger'
  } else {
    return 'is-success'
  }
}

export const state = () => ({
  complianceList: [],
})

export const getters = {
  getLicensesCompliance: (state, getters) => {
    const compliance = []

    _.map(state.complianceList, (val) => {
      compliance.push({
        ...val,
        compliance: val.compliance * 100,
        complianceStroke: showStrokeColor(val.compliance * 100),
      })
    })

    return getters.filteredOrNot(compliance)
  },
}

export const mutations = {
  SET_COMPLIANCE_LIST: (state, payload) => {
    state.complianceList = setFullPartNumber(payload)
  },
}

export const actions = {
  async getComplianceList({ commit, dispatch, getters }) {
    dispatch('onLoadingTable')

    const complianceList = await axiosNoLoading.get(
      '/hosts/technologies/all/databases/licenses-compliance',
      {
        params: {
          'older-than': getters.getActiveFilters.date,
          environment: getters.getActiveFilters.environment,
          location: getters.getActiveFilters.location,
        },
      }
    )
    const response = await complianceList.data.licensesCompliance
    if (response) {
      dispatch('offLoadingTable')
      commit('SET_COMPLIANCE_LIST', response)
    }
  },
}
