// import _ from 'lodash'
// import { axiosRequest } from '@/services/services.js'

const scenarios = [
  {
    name: 'Scenario 1',
    id: '43561362456345',
    createdAt: '2025-10-06T08:23:40.000Z',
    data: [
      {
        hostname: 'CLUAP01',
        id: '67af443d00c7f994447d43c4',
        core: 10,
      },
      {
        hostname: 'CLUAP02',
        id: '66f3da1b5cc4e511cca37eae',
        core: 20,
      },
    ],
  },
  {
    name: 'Scenario 2',
    id: '3463456763546',
    createdAt: '2025-10-06T08:23:40.000Z',
    data: [
      {
        hostname: 'CLUAP01',
        id: '67af443d00c7f994447d43c4',
        core: 2,
      },
      {
        hostname: 'CLUAP02',
        id: '66f3da1b5cc4e511cca37eae',
        core: 10,
      },
      {
        hostname: 'CLVERI01',
        id: '66f3da1b5cc4e511cca37e9a',
        core: 10,
      },
    ],
  },
  {
    name: 'Scenario 3',
    id: '4683568273',
    createdAt: '2025-10-06T08:23:40.000Z',
    data: [
      {
        hostname: 'CLUAP01',
        id: '67af443d00c7f994447d43c4',
        core: 30,
      },
      {
        hostname: 'CLUAP02',
        id: '66f3da1b5cc4e511cca37eae',
        core: 10,
      },
      {
        hostname: 'CLVERI01',
        id: '66f3da1b5cc4e511cca37e9a1',
        core: 20,
      },
      {
        hostname: 'CLVERI01',
        id: '66f3da1b5cc4e511cca37e9a',
        core: 30,
      },
    ],
  },
]

export const state = () => ({
  listScenarios: [],
})

export const getters = {
  getListScenarios: (state) => {
    return state.listScenarios
  },
}

export const mutations = {
  SET_LIST_SCENARIOS: (state, payload) => {
    state.listScenarios = payload
  },
}

export const actions = {
  async fetchListScenarios({ commit, dispatch }) {
    dispatch('onLoadingTable')

    commit('SET_LIST_SCENARIOS', scenarios)

    dispatch('offLoadingTable')
  },
}
