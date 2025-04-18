import _ from 'lodash'
import { bus } from '@/helpers/eventBus.js'
import { axiosRequest } from '@/services/services.js'
import formatDateTime from '@/filters/formatDateTime.js'

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
    } else if (getters.returnCloudTechnology === 'Google') {
      recommendations = state.cloudRecommendations
    }

    return getters.filteredOrNot(recommendations)
  },
  returnCloudRecommendationsLastUpdate(state) {
    const updated = state.cloudRecommendationsLastUpdate
    return updated ? formatDateTime(state.cloudRecommendationsLastUpdate) : null
  },
  returnCategoryChartData: (state) => {
    const total = state.cloudRecommendations.length
    return chartsCountData(state.cloudRecommendations, 'category', total)
  },
  returnObjectTypeChartData: (state) => {
    const total = state.cloudRecommendations.length
    return chartsCountData(state.cloudRecommendations, 'objectType', total)
  },
  returnSuggestionChartData: (state) => {
    const total = state.cloudRecommendations.length
    return chartsCountData(state.cloudRecommendations, 'suggestion', total)
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
      url = 'oracle-cloud/oci-recommendations'
    } else if (getters.returnCloudTechnology === 'Aws') {
      url = 'aws/aws-recommendations'
    } else if (getters.returnCloudTechnology === 'Google') {
      url = 'gcp/recommendations'
    }

    const config = {
      method: 'get',
      url: url,
    }

    await axiosRequest('thunderApi', config)
      .then((res) => {
        let data = res.data.recommendations || res.data

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
      url = `oracle-cloud/oci-recommendation-errors/${seqNum}`
    } else if (getters.returnCloudTechnology === 'Aws') {
      url = `aws/aws-recommendation-errors/${seqNum}`
    } else if (getters.returnCloudTechnology === 'Google') {
      url = `gcp/errors`
    }

    const config = {
      method: 'get',
      url: url,
    }

    await axiosRequest('thunderApi', config).then((res) => {
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
      url = 'oracle-cloud/retrieve-last-oci-recommendations'
    } else if (getters.returnCloudTechnology === 'Aws') {
      url = 'aws/retrieve-last-aws-recommendations'
    } else if (getters.returnCloudTechnology === 'Google') {
      url = 'gcp/retrieve-last-gcp-recommendations'
    }

    const config = {
      method: 'get',
      url: url,
      timeout: 300000,
    }

    await axiosRequest('thunderApi', config)
      .then(() => {
        bus.$emit('finishRetrieveUpdates')
      })
      .catch(() => {
        bus.$emit('finishRetrieveUpdates')
      })
  },
}

const chartsCountData = (data, type) => {
  let totalData = {}
  let labels = []
  let series = []

  totalData = _.map(data, (val) => {
    return {
      type: val[type],
      cloud: val.cloud,
    }
  })

  totalData = _.groupBy(totalData, 'type')

  labels = _.map(totalData, (v, k) => k)
  series = _.map(totalData, (v, k) => v.length)

  totalData = {
    labels: labels,
    series: series,
  }

  return totalData
}
