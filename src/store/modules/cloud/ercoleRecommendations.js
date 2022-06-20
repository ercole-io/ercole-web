import _ from 'lodash'
import { bus } from '@/helpers/eventBus.js'
import { axiosRequest } from '@/services/services.js'
import formatDateTime from '@/filters/formatDateTime.js'

export const state = () => ({
  ercoleRecommendations: [],
  ercoleRecommendationsLastUpdate: null,
})

export const getters = {
  returnErcoleRecommendations: (state, getters) => {
    return getters.filteredOrNot(state.ercoleRecommendations)
  },
  returnErcoleRecommendationsLastUpdate(state) {
    const updated = state.ercoleRecommendationsLastUpdate
    return updated
      ? formatDateTime(state.ercoleRecommendationsLastUpdate)
      : null
  },
}

export const mutations = {
  SET_ERCOLE_RECOMMENDATIONS: (state, payload) => {
    state.ercoleRecommendations = payload
  },
  SET_ERCOLE_RECOMMENDATIONS_LAST_UPDATE: (state, payload) => {
    state.ercoleRecommendationsLastUpdate = payload
  },
}

export const actions = {
  async getErcoleRecommendations({ commit, dispatch }) {
    dispatch('onLoadingTable')

    const config = {
      method: 'get',
      url: '/oracle-cloud/oci-recommendations',
    }

    await axiosRequest('thunderApi', config, false)
      .then((res) => {
        if (res.data.recommendations.length > 0) {
          const lastUpdate = res.data.recommendations[0].createdAt
          commit('SET_ERCOLE_RECOMMENDATIONS', res.data.recommendations)
          commit('SET_ERCOLE_RECOMMENDATIONS_LAST_UPDATE', lastUpdate)

          return res.data.recommendations[0].seqValue
        } else {
          commit('SET_ERCOLE_RECOMMENDATIONS', [])
          commit('SET_ERCOLE_RECOMMENDATIONS_LAST_UPDATE', null)

          return 0
        }
      })
      .then((seqNum) => {
        dispatch('getErcoleRecommendationsErrors', seqNum)
      })
      .then(() => {
        dispatch('offLoadingTable')
      })
  },
  async getErcoleRecommendationsErrors({ commit }, seqNum) {
    const config = {
      method: 'get',
      url: `/oracle-cloud/oci-recommendation-errors/${seqNum}`,
    }

    await axiosRequest('thunderApi', config, false).then((res) => {
      let errors = []
      let profileError = []

      if (res.data.length > 0) {
        _.map(res.data, (err) => {
          if (_.includes(err.error, 'can not create client')) {
            if (err.profileID !== '') {
              profileError.push({ profileID: err.profileID })
            }
          } else {
            errors.push(err)
          }
        })
      }

      profileError = _.uniqBy(profileError, 'profileID').length

      commit('SET_OCI_ACTIVE_PROFILE_ERRORS', profileError)
      commit('SET_OCI_ACTIVE_PROFILE_GENERAL_ERRORS', errors)
    })
  },
  async retireveRecommendations() {
    const config = {
      method: 'get',
      url: '/oracle-cloud/retrieve-last-oci-recommendations',
      timeout: 300000,
    }

    await axiosRequest('thunderApi', config, false)
      .then(() => {
        bus.$emit('finishRetrieveUpdates')
      })
      .catch(() => {
        bus.$emit('finishRetrieveUpdates')
      })
  },
}
