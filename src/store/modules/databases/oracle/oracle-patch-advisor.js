import { _ } from 'core-js'
import moment from 'moment'
import axiosDefault from '@/axios/axios-default'
import formatDate from '@/filters/formatDate.js'

export const state = () => ({
  patchAdvisor: [],
})

export const getters = {
  getOraclePatchAdvisor: (state, getters) => {
    let patchAdvisorData = []

    _.map(state.patchAdvisor, (val) => {
      patchAdvisorData.push({
        ...val,
        date: formatDate(val.date),
        fourMonths: val.fourMonths,
        fourMonthsText: val.fourMonths ? 'yes' : 'no',
        sixMonths: val.sixMonths,
        sixMonthsText: val.sixMonths ? 'yes' : 'no',
        twelveMonths: val.twelveMonths,
        twelveMonthsText: val.twelveMonths ? 'yes' : 'no',
      })
    })

    return getters.filteredOrNot(patchAdvisorData)
  },
}

export const mutations = {
  SET_PATCH_ADVISOR: (state, payload) => {
    state.patchAdvisor = payload
  },
}

export const actions = {
  async getPatchAdvisor({ commit, getters }) {
    const patchAdvisor = await axiosDefault.get(
      '/hosts/technologies/oracle/databases/patch-advisors',
      {
        params: {
          'older-than': getters.getActiveFilters.date,
          environment: getters.getActiveFilters.environment,
          location: getters.getActiveFilters.location,
        },
      }
    )
    const response = await patchAdvisor.data.content
    commit('SET_PATCH_ADVISOR', response)
  },
}
