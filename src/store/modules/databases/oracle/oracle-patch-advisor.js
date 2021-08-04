import { _ } from 'core-js'
import moment from 'moment'
import axiosDefault from '@/axios/axios-default'
import formatDate from '@/filters/formatDate.js'

export const state = () => ({
  patchAdvisor: []
})

export const getters = {
  getOraclePatchAdvisor: (state, getters) => {
    let patchAdvisorData = []

    _.map(state.patchAdvisor, val => {
      let four = dateBetweenMonthRange(val.date, 4)
      let six = dateBetweenMonthRange(val.date, 6)
      let twelve = dateBetweenMonthRange(val.date, 12)

      patchAdvisorData.push({
        ...val,
        date: formatDate(val.date),
        fourMonths: four[0],
        fourMonthsText: four[1],
        sixMonths: six[0],
        sixMonthsText: six[0],
        twelveMonths: twelve[0],
        twelveMonthsText: twelve[1]
      })
    })

    return getters.filteredOrNot(patchAdvisorData)
  }
}

export const mutations = {
  SET_PATCH_ADVISOR: (state, payload) => {
    state.patchAdvisor = payload
  }
}

export const actions = {
  async getPatchAdvisor({ commit, getters }) {
    const patchAdvisor = await axiosDefault.get(
      '/hosts/technologies/oracle/databases/patch-advisors',
      {
        params: {
          'older-than': getters.getActiveFilters.date,
          environment: getters.getActiveFilters.environment,
          location: getters.getActiveFilters.location
        }
      }
    )
    const response = await patchAdvisor.data
    commit('SET_PATCH_ADVISOR', response)
  }
}

const dateBetweenMonthRange = (date, month) => {
  const startDate = moment()
    .subtract(month, 'month')
    .format('YYYY-MM-DD')
  const endDate = moment()
    .add(1, 'days')
    .format('YYYY-MM-DD')
  const dateToCheck = moment(date).format('YYYY-MM-DD')
  const finalCompare = moment(dateToCheck).isBetween(startDate, endDate)

  return [finalCompare, finalCompare ? 'yes' : 'no']
}
