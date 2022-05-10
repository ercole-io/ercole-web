import _ from 'lodash'
import axios from 'axios'
import { axiosRequest } from '@/services/services.js'

export const state = () => ({
  ercoleRecommendations: [],
})

export const getters = {
  returnErcoleRecommendations: (state, getters) => {
    return getters.filteredOrNot(state.ercoleRecommendations)
  },
}

export const mutations = {
  SET_ERCOLE_RECOMMENDATIONS: (state, payload) => {
    state.ercoleRecommendations = payload
  },
}

export const actions = {
  async getErcoleRecommendations({ commit, dispatch, getters }) {
    dispatch('onLoadingTable')
    const setUrl = (name) => {
      return `/oracle-cloud/${name}/${getters.getOciActiveProfiles}`
    }
    const endPoints = [
      setUrl('load-balancers'),
      setUrl('instances-idle'),
      setUrl('block-storage'),
      setUrl('old-snapshot'),
      setUrl('unused-storage'),
      setUrl('instance-rightsizing'),
      setUrl('sis-rightsizing'),
      setUrl('object-storage-optimization'),
      setUrl('unused-service-decommisioning'),
    ]

    await Promise.all(
      endPoints.map((endpoint) =>
        axiosRequest('thunderApi', {
          merthod: 'get',
          url: endpoint,
        })
      )
    ).then(
      axios.spread((...allData) => {
        const mergeData = []
        _.map(allData, (data) => {
          _.forEach(data.data.recommendations, (values) => {
            mergeData.push(values)
          })
          if (data.data.error) {
            commit('SET_OCI_ACTIVE_PROFILE_ERROR', data.data.error)
          }
        })
        commit('SET_ERCOLE_RECOMMENDATIONS', mergeData)
        dispatch('offLoadingTable')
      })
    )
  },
}
