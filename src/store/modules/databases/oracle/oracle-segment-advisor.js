import _ from 'lodash'
import axiosDefault from '@/axios/axios-default.js'
import { filterByKeys } from '@/helpers/helpers.js'

export const state = () => ({
  segmentAdvisor: []
})

export const getters = {
  getOracleSegmentAdvisor: (state, getters, rootState) => {
    if (rootState.localFilters.hasFilters) {
      return filterByKeys(state.segmentAdvisor, rootState.localFilters.filters)
    } else {
      return state.segmentAdvisor
    }
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
