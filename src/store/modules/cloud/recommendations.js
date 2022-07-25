import _ from 'lodash'
import { bus } from '@/helpers/eventBus.js'
import { axiosRequest } from '@/services/services.js'
import formatDateTime from '@/filters/formatDateTime.js'
// import awsData from '@/store/modules/cloud/aws-recommendations.json'

export const state = () => ({
  cloudRecommendations: [],
  cloudRecommendationsLastUpdate: null,
})

export const getters = {
  returnCloudRecommendations: (state, getters) => {
    let recommendations = []
    if (getters.returnCloudTechnology === 'Oracle') {
      recommendations = state.cloudRecommendations
    } else if (getters.returnCloudTechnology === 'Aws') {
      _.map(state.cloudRecommendations, (values) => {
        const details = []
        _.filter(values.details, (dt) => {
          details.push({
            name: _.toPairs(dt)[0][0],
            value: _.toPairs(dt)[0][1],
          })
        })

        recommendations.push({
          ...values,
          details: details,
        })
      })
    }

    return getters.filteredOrNot(recommendations)
  },
  returnCloudRecommendationsLastUpdate(state) {
    const updated = state.cloudRecommendationsLastUpdate
    return updated ? formatDateTime(state.cloudRecommendationsLastUpdate) : null
  },
}

export const mutations = {
  SET_CLOUD_RECOMMENDATIONS: (state, payload) => {
    state.cloudRecommendations = payload
  },
  SET_CLOUD_RECOMMENDATIONS_LAST_UPDATE: (state, payload) => {
    state.cloudRecommendationsLastUpdate = payload
  },
}

export const actions = {
  async getCloudRecommendations({ commit, getters, dispatch }) {
    dispatch('onLoadingTable')

    let url = null
    if (getters.returnCloudTechnology === 'Oracle') {
      url = '/oracle-cloud/oci-recommendations'
    } else if (getters.returnCloudTechnology === 'Aws') {
      url = '/aws/aws-recommendations'
    }

    const config = {
      method: 'get',
      url: url,
    }

    await axiosRequest('thunderApi', config, false)
      .then((res) => {
        let data = res.data.recommendations

        // if (getters.returnCloudTechnology === 'Aws') {
        //   data = awsData.recommendations
        // }

        if (data.length > 0) {
          const lastUpdate = data[0].createdAt
          commit('SET_CLOUD_RECOMMENDATIONS', data)
          commit('SET_CLOUD_RECOMMENDATIONS_LAST_UPDATE', lastUpdate)

          return data[0].seqValue
        } else {
          commit('SET_CLOUD_RECOMMENDATIONS', [])
          commit('SET_CLOUD_RECOMMENDATIONS_LAST_UPDATE', null)

          return 0
        }
      })
      .then((seqNum) => {
        dispatch('getCloudRecommendationsErrors', seqNum)
      })
      .then(() => {
        dispatch('offLoadingTable')
      })
  },
  async getCloudRecommendationsErrors({ commit, getters }, seqNum) {
    let url = null
    if (getters.returnCloudTechnology === 'Oracle') {
      url = `/oracle-cloud/oci-recommendation-errors/${seqNum}`
    } else if (getters.returnCloudTechnology === 'Aws') {
      url = `/aws/aws-recommendation-errors/${seqNum}`
    }

    const config = {
      method: 'get',
      url: url,
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

      commit('SET_CLOUD_ACTIVE_PROFILE_ERRORS', profileError)
      commit('SET_CLOUD_ACTIVE_PROFILE_GENERAL_ERRORS', errors)
    })
  },
  async retireveCloudRecommendations({ getters }) {
    let url = null
    if (getters.returnCloudTechnology === 'Oracle') {
      url = '/oracle-cloud/retrieve-last-oci-recommendations'
    } else if (getters.returnCloudTechnology === 'Aws') {
      url = '/aws/retrieve-last-aws-recommendations'
    }

    const config = {
      method: 'get',
      url: url,
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
