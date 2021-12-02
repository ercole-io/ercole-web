import axiosOci from '@/axios/axios-oci'

export const state = () => ({
  loadBalancers: [],
})

export const getters = {
  getLoadBalancers: (state, getters) => {
    return getters.filteredOrNot(state.loadBalancers)
  },
}

export const mutations = {
  SET_LOAD_BALANCERS: (state, payload) => {
    state.loadBalancers = payload
  },
}

export const actions = {
  async getLoadBalancersData({ commit, getters }) {
    let response = null
    let error = null

    if (getters.getOciActiveProfiles.length > 0) {
      const loadBalancers = await axiosOci.get(
        `/oracle-cloud/loadbalancers/${getters.getOciActiveProfiles}`
      )
      response = await loadBalancers.data.recommendations
      error = await loadBalancers.data.error
    } else {
      ;(response = []), (error = '')
    }

    commit('SET_LOAD_BALANCERS', response)
    commit('SET_OCI_ACTIVE_PROFILE_ERROR', error)
  },
}
