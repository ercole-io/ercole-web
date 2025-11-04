import _ from 'lodash'
import { axiosRequest } from '@/services/services.js'

export const state = () => ({
  hostsData: [],
  cloneHosts: [],
})

export const getters = {
  getHostsData: (state) => {
    const cloneHosts = state.cloneHosts.hosts || []
    return _.map(state.hostsData, (host) => {
      const simCoreObj = cloneHosts.find((cl) => cl.hostname === host.hostname)
      const newCore = simCoreObj ? simCoreObj.simulatedCore : host.info.cpuCores

      return {
        id: host.id,
        hostname: host.hostname,
        threads: host.info.cpuThreads,
        cores: host.info.cpuCores,
        socket: host.info.cpuSockets,
        newCore,
        location: host.location,
      }
    })
  },
  getCloneLocation: (state) => {
    return state.cloneHosts.location
  },
  getCloneHosts: (state) => {
    return _.map(state.cloneHosts.hosts, (cl) => {
      return {
        hostname: cl.hostname,
        newCore: cl.simulatedCore,
        cores: cl.originalCore,
      }
    })
  },
}

export const mutations = {
  SET_HOSTS_DATA: (state, payload) => {
    state.hostsData = payload
  },
  SET_CLONE_HOSTS: (state, payload) => {
    state.cloneHosts = payload
  },
}

export const actions = {
  async fetchHostsData({ commit, getters, dispatch }, location) {
    dispatch('onLoadingTable')

    const params = {
      'sort-by': getters.getSortItem,
      'sort-desc': getters.getSortOrder,
      page: getters.getPageNum,
      size: getters.getPerPage,
      search: getters.getSearchTherm,
      location: location,
      mode: 'summary',
    }

    const config = {
      method: 'get',
      url: 'hosts',
      params: params,
    }

    await axiosRequest('baseApi', config).then((res) => {
      const data = res.data.hosts

      commit('SET_HOSTS_DATA', data)
      commit('SET_TOTAL_DATA', data.length)
      commit('SET_PAGE_LENGTH', data.length)

      dispatch('offLoadingTable')
    })
  },
  createScenario({ dispatch }, data) {
    dispatch('onLoadingTable')

    const config = {
      method: 'post',
      url: 'scenarios',
      data: data,
    }

    return axiosRequest('baseApi', config)
  },
}
