import _ from 'lodash'
import axiosDefault from '@/axios/axios-default.js'

export const state = () => ({
  segmentAdvisor: []
})

export const getters = {
  getOracleSegmentAdvisor: (state, getters) => {
    return getters.filteredOrNot(state.segmentAdvisor)
  },
  top10reclaimableChart: (state, getters) => {
    const top10data = _.take(
      _.orderBy(getters.getOracleSegmentAdvisor, ['reclaimable'], ['desc']),
      10
    )
    let top10result = []

    _.map(top10data, val => {
      top10result.push([`${val.hostname} - ${val.dbname}`, val.reclaimable])
    })

    return top10result
  }
}

export const mutations = {
  SET_SEGMENT_ADVISOR: (state, payload) => {
    const newPayload = []
    _.forEach(payload, val => {
      newPayload.push({ ...val, retrieve: val.retrieve * 100 })
    })
    state.segmentAdvisor = newPayload
  }
}

export const actions = {
  async getSegmentAdvisor({ commit, getters }) {
    const segmentAdvisor = await axiosDefault.get(
      '/hosts/technologies/oracle/databases/segment-advisors',
      {
        params: {
          'older-than': getters.getActiveFilters.date,
          environment: getters.getActiveFilters.environment,
          location: getters.getActiveFilters.location
        }
      }
    )
    const response = await segmentAdvisor.data.segmentAdvisors
    commit('SET_SEGMENT_ADVISOR', response)
  }
}
