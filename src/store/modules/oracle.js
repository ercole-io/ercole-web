import axiosDefault from '../../axios/axios-default'
import axiosNoLoading from '../../axios/axios-no-loading.js'

export const state = () => ({
  oracleDbs: [],
  topWorkload: [],
  topReclaimable: []
})

export const getters = {}

export const mutations = {
  SET_ORACLE_DBS: (state, payload) => {
    state.oracleDbs = payload
  },
  SET_TOP_WORLOAD: (state, payload) => {
    state.topWorkload = payload
  },
  SET_TOP_RECLAIMABLE: (state, payload) => {
    state.topReclaimable = payload
  }
}

export const actions = {
  async getOracleDbs({ commit, dispatch }) {
    const oracleDbs = await axiosDefault.get(
      '/hosts/technologies/oracle/databases'
    )
    const response = await oracleDbs.data
    commit('SET_ORACLE_DBS', response)
    dispatch('getTopWorkload')
    dispatch('getTopReclaimable')
  },
  async getTopWorkload({ commit }) {
    const topWorkload = await axiosNoLoading.get(
      '/hosts/technologies/oracle/databases/top-workload'
    )
    const response = await topWorkload.data
    commit('SET_TOP_WORLOAD', response)
  },
  async getTopReclaimable({ commit }) {
    const topReclaimable = await axiosNoLoading.get(
      '/hosts/technologies/oracle/databases/top-reclaimable'
    )
    const response = await topReclaimable.data
    commit('SET_TOP_RECLAIMABLE', response)
  }
}
