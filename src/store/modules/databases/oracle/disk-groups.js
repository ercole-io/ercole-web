import { axiosRequest } from '@/services/services.js'

export const state = () => ({
  diskGroups: [],
})

export const getters = {
  getDiskGroups: (state, getters) => {
    return getters.filteredOrNot(state.diskGroups)
  },
}

export const mutations = {
  SET_DISK_GROUPS: (state, payload) => {
    state.diskGroups = payload
  },
}

export const actions = {
  async requestDiskGoups({ commit, getters, dispatch }) {
    dispatch('onLoadingTable')

    const config = {
      method: 'get',
      url: 'hosts/technologies/oracle/databases/diskgroups',
      params: {
        'older-than': getters.getActiveFilters.date,
        environment: getters.getActiveFilters.environment,
        location: getters.getActiveFilters.location,
      },
      validateStatus: false,
    }

    await axiosRequest('baseApi', config).then((res) => {
      dispatch('offLoadingTable')
      commit('SET_DISK_GROUPS', res.data)
    })
  },
}
