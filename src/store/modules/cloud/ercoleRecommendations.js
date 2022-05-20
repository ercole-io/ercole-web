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
        const recommendations = []
        const errors = []
        let profileError = ''

        _.map(allData, (val) => {
          if (val.data.error) {
            if (_.includes(val.data.error, 'http status code:')) {
              errors.push(val.data.error)
            } else {
              profileError = _.slice(val.data.error)[0]
            }
          }

          _.forEach(val.data.recommendations, (values) => {
            recommendations.push(values)
          })
        })

        commit('SET_ERCOLE_RECOMMENDATIONS', recommendations)
        commit('SET_OCI_ACTIVE_PROFILE_ERRORS', profileError)
        commit('SET_OCI_ACTIVE_PROFILE_GENERAL_ERRORS', errors)

        dispatch('offLoadingTable')
      })
    )
  },
}
