import axiosNoLoading from '@/axios/axios-no-loading.js'

export const state = () => ({
  addms: [],
})

export const getters = {
  getOracleAddms: (state, getters) => {
    return getters.filteredOrNot(state.addms)
  },
}

export const mutations = {
  SET_ADDMS: (state, payload) => {
    state.addms = payload
  },
}

export const actions = {
  async getAddms({ commit, dispatch, getters }) {
    dispatch('onLoadingTable')

    const addms = await axiosNoLoading.get(
      '/hosts/technologies/oracle/databases/addms',
      {
        params: {
          'older-than': getters.getActiveFilters.date,
          environment: getters.getActiveFilters.environment,
          location: getters.getActiveFilters.location,
        },
      }
    )
    const response = await addms.data
    if (response) {
      dispatch('offLoadingTable')
      commit('SET_ADDMS', response)
    }
  },
}
