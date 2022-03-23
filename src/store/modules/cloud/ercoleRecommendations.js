import _ from 'lodash'
import axios from 'axios'
import axiosOciNoLoading from '@/axios/axios-oci-no-loading.js'

export const state = () => ({
  loadBalancers: [],
  instancesIdle: [],
  blockstorage: [],
  oldsnapshot: [],
  unusedstorage: [],
  instancerightsizing: [],
})

export const getters = {
  getMergedData: (state, getters) => {
    const mergedData = _.concat(
      state.loadBalancers,
      state.instancesIdle,
      state.blockstorage,
      state.oldsnapshot,
      state.unusedstorage,
      state.instancerightsizing
    )
    return getters.filteredOrNot(mergedData)
  },
}

export const mutations = {
  SET_ERCOLE_RECOMMENDATIONS: (state, payload) => {
    state.loadBalancers = payload.loadbalancers
    state.instancesIdle = payload.instancesidle
    state.blockstorage = payload.blockstorage
    state.oldsnapshot = payload.oldsnapshot
    state.unusedstorage = payload.unusedstorage
    state.instancerightsizing = payload.instancerightsizing
  },
}

export const actions = {
  async getRrcoleRecommendations({ commit, dispatch, getters }) {
    dispatch('onLoadingTable')
    const setUrl = (name) => {
      return `/oracle-cloud/${name}/${getters.getOciActiveProfiles}`
    }

    axios
      .all([
        await axiosOciNoLoading.get(setUrl('load-balancers')),
        await axiosOciNoLoading.get(setUrl('instances-idle')),
        await axiosOciNoLoading.get(setUrl('block-storage')),
        await axiosOciNoLoading.get(setUrl('old-snapshot')),
        await axiosOciNoLoading.get(setUrl('unused-storage')),
        await axiosOciNoLoading.get(setUrl('instance-rightsizing')),
      ])
      .then(
        axios.spread(
          (
            loadbalancers,
            instancesidle,
            blockstorage,
            oldsnapshot,
            unusedstorage,
            instancerightsizing
          ) => {
            commit('SET_ERCOLE_RECOMMENDATIONS', {
              loadbalancers: loadbalancers.data.recommendations,
              instancesidle: instancesidle.data.recommendations,
              blockstorage: blockstorage.data.recommendations,
              oldsnapshot: oldsnapshot.data.recommendations,
              unusedstorage: unusedstorage.data.recommendations,
              instancerightsizing: instancerightsizing.data.recommendations,
            })
            dispatch('offLoadingTable')
          }
        )
      )
  },
  // async getLoadBalancersData({ commit, getters }) {
  //   let response = null
  //   let error = null

  //   if (getters.getOciActiveProfiles.length > 0) {
  //     const loadBalancers = await axiosOci.get(
  //       `/oracle-cloud/load-balancers/${getters.getOciActiveProfiles}`
  //     )
  //     response = await loadBalancers.data.recommendations
  //     error = await loadBalancers.data.error
  //   } else {
  //     ;(response = []), (error = '')
  //   }

  //   commit('SET_LOAD_BALANCERS', response)
  //   commit('SET_OCI_ACTIVE_PROFILE_ERROR', error)
  // },
  // async getInstancesIdleData({ commit, getters }) {
  //   let response = null
  //   let error = null

  //   if (getters.getOciActiveProfiles.length > 0) {
  //     const instancesidle = await axiosOci.get(
  //       `/oracle-cloud/instances-idle/${getters.getOciActiveProfiles}`
  //     )
  //     response = await instancesidle.data.recommendations
  //     error = await instancesidle.data.error
  //   } else {
  //     ;(response = []), (error = '')
  //   }

  //   commit('SET_INSTANCES_IDLE', response)
  //   commit('SET_OCI_ACTIVE_PROFILE_ERROR', error)
  // },
  // async getBlockStorageData({ commit, getters }) {
  //   let response = null
  //   let error = null

  //   if (getters.getOciActiveProfiles.length > 0) {
  //     const blockstorage = await axiosOci.get(
  //       `/oracle-cloud/block-storage/${getters.getOciActiveProfiles}`
  //     )
  //     response = await blockstorage.data.recommendations
  //     error = await blockstorage.data.error
  //   } else {
  //     ;(response = []), (error = '')
  //   }

  //   commit('SET_BLOCK_STORAGE', response)
  //   commit('SET_OCI_ACTIVE_PROFILE_ERROR', error)
  // },
}
