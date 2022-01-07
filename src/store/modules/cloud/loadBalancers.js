import axiosOci from '@/axios/axios-oci'
import _ from 'lodash'

export const state = () => ({
  loadBalancers: [],
  instancesIdle: [],
  blockstorage: [],
})

export const getters = {
  getMergedData: (state, getters) => {
    const mergedData = _.merge(
      state.loadBalancers,
      state.instancesIdle,
      state.blockstorage
    )
    return getters.filteredOrNot(mergedData)
  },
}

export const mutations = {
  SET_LOAD_BALANCERS: (state, payload) => {
    state.loadBalancers = payload
  },
  SET_INSTANCES_IDLE: (state, payload) => {
    state.instancesIdle = payload
  },
  SET_BLOCK_STORAGE: (state, payload) => {
    state.blockstorage = payload
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
  async getInstancesIdleData({ commit, getters }) {
    let response = null
    let error = null

    if (getters.getOciActiveProfiles.length > 0) {
      const instancesidle = await axiosOci.get(
        `/oracle-cloud/instancesidle/${getters.getOciActiveProfiles}`
      )
      response = await instancesidle.data.recommendations
      error = await instancesidle.data.error
    } else {
      ;(response = []), (error = '')
    }

    commit('SET_INSTANCES_IDLE', response)
    commit('SET_OCI_ACTIVE_PROFILE_ERROR', error)
  },
  async getBlockStorageData({ commit, getters }) {
    let response = null
    let error = null

    if (getters.getOciActiveProfiles.length > 0) {
      const blockstorage = await axiosOci.get(
        `/oracle-cloud/blockstorage/${getters.getOciActiveProfiles}`
      )
      response = await blockstorage.data.recommendations
      error = await blockstorage.data.error
    } else {
      ;(response = []), (error = '')
    }

    commit('SET_BLOCK_STORAGE', response)
    commit('SET_OCI_ACTIVE_PROFILE_ERROR', error)
  },
}
