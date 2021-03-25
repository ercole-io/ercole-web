import axiosDefault from '@/axios/axios-default.js'

export const state = () => ({
  addms: []
})

export const getters = {
  getOracleAddms: state => {
    return state.addms
  }
}

export const mutations = {
  SET_ADDMS: (state, payload) => {
    state.addms = payload
  }
}

export const actions = {
  async getAddms({ commit, getters }) {
    const addms = await axiosDefault.get(
      '/hosts/technologies/oracle/databases/addms',
      {
        params: {
          'older-than': getters.getActiveFilters.date,
          environment: getters.getActiveFilters.environment,
          location: getters.getActiveFilters.location
        }
      }
    )
    const response = await addms.data
    commit('SET_ADDMS', response)
  }
}
