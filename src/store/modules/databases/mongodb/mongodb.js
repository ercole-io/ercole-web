import { axiosRequest } from '@/services/services.js'

export const state = () => ({
  mongodb: [],
})

export const getters = {
  getAllMongoDbDbs: (state, getters) => {
    return getters.filteredOrNot(state.mongodb)
  },
}

export const mutations = {
  SET_MONGODB_DBS: (state, payload) => {
    state.mongodb = payload
  },
}

export const actions = {
  async getMOngoDbDbs({ commit, dispatch, getters }) {
    dispatch('onLoadingTable')

    const config = {
      method: 'get',
      url: 'hosts/technologies/mongodb/databases',
      params: {
        'older-than': getters.getActiveFilters.date,
        environment: getters.getActiveFilters.environment,
        location: getters.getActiveFilters.location,
      },
    }

    await axiosRequest('baseApi', config).then((res) => {
      dispatch('offLoadingTable')
      commit('SET_MONGODB_DBS', res.data)
    })
  },
}
