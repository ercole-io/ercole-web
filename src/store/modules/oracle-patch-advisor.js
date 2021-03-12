import { _ } from 'core-js'
import moment from 'moment'
import axiosDefault from '@/axios/axios-default'

export const state = () => ({
  patchAdvisor: []
})

export const getters = {
  getOraclePatchAdvisor: state => {
    let patchAdvisorData = []

    _.map(state.patchAdvisor, val => {
      let four = dateBetweenMonthRange(val.date, 4)
      let six = dateBetweenMonthRange(val.date, 6)
      let twelve = dateBetweenMonthRange(val.date, 12)

      patchAdvisorData.push({
        ...val,
        fourMonths: {
          month: four[0],
          text: four[1]
        },
        sixMonths: {
          month: six[0],
          text: six[1]
        },
        twelveMonths: {
          month: twelve[0],
          text: twelve[1]
        }
      })
    })

    return patchAdvisorData
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
