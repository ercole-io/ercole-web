import _ from 'lodash'
import { axiosRequest } from '@/services/services.js'

export const state = () => ({
  noDataAgents: [],
  missingDbs: [],
  vHostsNoCluster: [],
})

export const getters = {}

export const mutations = {
  SET_NO_DATA_AGENTS: (state, payload) => {
    state.noDataAgents = payload
  },
  SET_MISSING_DBS: (state, payload) => {
    state.missingDbs = payload
  },
  SET_V_HOSTS_NO_CLUSTER: (state, payload) => {
    state.vHostsNoCluster = _.take(payload, 10)
  },
}

export const actions = {
  async getNoDataAgents({ commit }) {
    const config = {
      method: 'get',
      url: '/alerts?status=NEW&code=NO_DATA&page=1&size=999999',
    }
    await axiosRequest('baseApi', config).then((res) => {
      commit('SET_NO_DATA_AGENTS', res.data.items || [])
    })
  },
  async getMissingDbs({ commit }) {
    const config = {
      method: 'get',
      url: '/hosts/missing-dbs',
    }
    await axiosRequest('baseApi', config).then((res) => {
      commit('SET_MISSING_DBS', res.data)
    })
  },
  async getvHostsNoCluster({ commit }) {
    const config = {
      method: 'get',
      url: '/hosts/no-clusters',
    }
    await axiosRequest('baseApi', config).then((res) => {
      commit('SET_V_HOSTS_NO_CLUSTER', res.data)
    })
  },
}
