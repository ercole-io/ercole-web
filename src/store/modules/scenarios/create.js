import _ from 'lodash'
import { axiosRequest } from '@/services/services.js'

export const state = () => ({
  hostsData: [],
})

export const getters = {
  getHostsData: (state) => {
    const hosts = _.map(state.hostsData, (val) => {
      return {
        id: val.id,
        hostname: val.hostname,
        threads: val.info.cpuThreads,
        cores: val.info.cpuCores,
        socket: val.info.cpuSockets,
        newCore: val.info.cpuCores,
        location: val.location,
      }
    })
    return hosts
  },
}

export const mutations = {
  SET_HOSTS_DATA: (state, payload) => {
    state.hostsData = payload
  },
}

export const actions = {
  async fetchHostsData({ commit, getters, dispatch }, location = null) {
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
