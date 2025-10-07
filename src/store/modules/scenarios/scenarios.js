import _ from 'lodash'
import { axiosRequest } from '@/services/services.js'

const scenarios = [
  {
    name: 'Scenario 1',
    data: [
      {
        cores: 8,
        hostname: 'CLUAP01',
        id: '67af443d00c7f994447d43c4',
        newCore: 10,
      },
      {
        cores: 8,
        hostname: 'CLUAP02',
        id: '66f3da1b5cc4e511cca37eae',
        newCore: 20,
      },
      {
        cores: 12,
        hostname: 'CLVERI01',
        id: '66f3da1b5cc4e511cca37e9a',
        newCore: 30,
      },
    ],
  },
  {
    name: 'Scenario 2',
    data: [
      {
        cores: 8,
        hostname: 'CLUAP01',
        id: '67af443d00c7f994447d43c4',
        newCore: 2,
      },
      {
        cores: 8,
        hostname: 'CLUAP02',
        id: '66f3da1b5cc4e511cca37eae',
        newCore: 10,
      },
      {
        cores: 12,
        hostname: 'CLVERI01',
        id: '66f3da1b5cc4e511cca37e9a',
        newCore: 10,
      },
    ],
  },
  {
    name: 'Scenario 3',
    data: [
      {
        cores: 8,
        hostname: 'CLUAP01',
        id: '67af443d00c7f994447d43c4',
        newCore: 30,
      },
      {
        cores: 8,
        hostname: 'CLUAP02',
        id: '66f3da1b5cc4e511cca37eae',
        newCore: 10,
      },
      {
        cores: 12,
        hostname: 'CLVERI01',
        id: '66f3da1b5cc4e511cca37e9a',
        newCore: 20,
      },
    ],
  },
]

export const state = () => ({
  hostsData: [],
  scenariosData: [],
})

export const getters = {
  getHostsData: (state) => {
    return _.map(state.hostsData, (val) => {
      return {
        id: val.id,
        hostname: val.hostname,
        threads: val.info.cpuThreads,
        cores: val.info.cpuCores,
        socket: val.info.cpuSockets,
        newCore: val.info.cpuCores,
      }
    })
  },
  getCreatedScenarios: (state) => {
    return state.scenariosData
  },
}

export const mutations = {
  SET_HOSTS_DATA: (state, payload) => {
    state.hostsData = payload
  },
  SET_CREATED_SCENARIOS: (state, payload) => {
    state.scenariosData = payload
  },
}

export const actions = {
  async fetchHostsData({ commit, getters, dispatch }, olderThan = null) {
    dispatch('onLoadingTable')

    const params = {
      'sort-by': getters.getSortItem,
      'sort-desc': getters.getSortOrder,
      page: getters.getPageNum,
      size: getters.getPerPage,
      search: getters.getSearchTherm,
      'older-than': getters.getActiveFilters.date || olderThan,
      environment: getters.getActiveFilters.environment,
      location: getters.getActiveFilters.location,
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
  async fetchCreatedScenarios({ commit, dispatch }) {
    dispatch('onLoadingTable')

    commit('SET_CREATED_SCENARIOS', scenarios)

    dispatch('offLoadingTable')
  },
}
