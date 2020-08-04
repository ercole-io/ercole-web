import axiosDefault from '../../axios/axios-default'
import _ from 'lodash'

export const state = () => ({
  databases: {},
  totalMemory: 0,
  totalSegment: 0,
  totalDatafile: 0
})

export const getters = {
  getTotalCpu: state => {
    return _.sumBy(state.databases, 'cpuCount')
  }
}

export const mutations = {
  SET_DATABASES: (state, payload) => {
    state.databases = payload
  },
  SET_TOTAL_MEMORY: (state, payload) => {
    state.totalMemory = payload
  },
  SET_TOTAL_SEGMENT: (state, payload) => {
    state.totalSegment = payload
  },
  SET_TOTAL_DATAFILE: (state, payload) => {
    state.totalDatafile = payload
  }
}

export const actions = {
  async getDatabases({ commit }) {
    const databases = await axiosDefault.get(
      '/hosts/technologies/oracle/databases'
    )
    const response = await databases.data
    commit('SET_DATABASES', response)
  },
  async getTotalMemory({ commit }) {
    const totalMemory = await axiosDefault.get(
      '/hosts/technologies/oracle/databases/total-memory-size'
    )
    const response = await totalMemory.data
    commit('SET_TOTAL_MEMORY', response)
  },
  async getTotalSegment({ commit }) {
    const totalSegment = await axiosDefault.get(
      '/hosts/technologies/oracle/databases/total-segment-size'
    )
    const response = await totalSegment.data
    commit('SET_TOTAL_SEGMENT', response)
  },
  async getTotalDatafile({ commit }) {
    const totalDatafile = await axiosDefault.get(
      '/hosts/technologies/oracle/databases/total-datafile-size'
    )
    const response = await totalDatafile.data
    commit('SET_TOTAL_DATAFILE', response)
  }
}
