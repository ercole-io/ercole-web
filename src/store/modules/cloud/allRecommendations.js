import _ from 'lodash'
import axios from 'axios'
import { axiosRequest } from '@/services/services.js'

export const state = () => ({
  cloudAllRecommendations: [],
})

export const getters = {
  returnCloudAllRecommendations: (state, getters) => {
    return getters.filteredOrNot(state.cloudAllRecommendations)
  },
  returnAllCategoryChartData: (state) => {
    return chartsCountData(state.cloudAllRecommendations, 'category')
  },
  returnAllObjectTypeChartData: (state) => {
    return chartsCountData(state.cloudAllRecommendations, 'objectType')
  },
  returnAllSuggestionChartData: (state) => {
    return chartsCountData(state.cloudAllRecommendations, 'suggestion')
  },
  returnAllTypesChartDataByCloud:
    (state) =>
    (filter = null, type) => {
      let search

      if (filter) {
        search = countCloudChartData(state.cloudAllRecommendations, type)
      }

      search = _.filter(search, (val) => {
        if (val[type] === filter) {
          return val
        }
      })

      return search
    },
}

export const mutations = {
  SET_CLOUD_ALL_RECOMMENDATIONS: (state, payload) => {
    state.cloudAllRecommendations = payload
  },
}

export const actions = {
  async getCloudAllRecommendations({ commit, dispatch }) {
    dispatch('onLoadingTable')

    const endPoints = [
      'oracle-cloud/oci-recommendations',
      'aws/aws-recommendations',
      'gcp/recommendations',
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
        let oci = allData[0].data.recommendations
        oci = _.map(oci, (val) => {
          return {
            cloud: 'Oracle',
            category: val.category,
            objectType: val.objectType,
            suggestion: val.suggestion,
            ociName: val.name,
            ociCompartmentName: val.compartmentName,
            details: val.details,
          }
        })

        let aws = allData[1].data.recommendations
        aws = _.map(aws, (val) => {
          const details = []
          _.filter(val.details, (dt) => {
            details.push({
              name: _.toPairs(dt)[0][0],
              value: _.toPairs(dt)[0][1],
            })
          })
          return {
            cloud: 'AWS',
            category: val.category,
            objectType: val.objectType,
            suggestion: val.suggestion,
            awsName: val.name,
            details: details,
          }
        })

        let gcp = allData[2].data
        gcp = _.map(gcp, (val) => {
          return {
            cloud: 'Google',
            category: val.category,
            objectType: val.objectType,
            suggestion: val.suggestion,
            gcpOptimizationScore: val.optimizationScore,
            gcpProjectName: val.projectName,
            gcpProfileID: val.profileID,
            gcpResourceName: val.resourceName,
            gcpResourceID: val.resourceID,
            details: val.details,
          }
        })

        commit('SET_CLOUD_ALL_RECOMMENDATIONS', _.concat(oci, aws, gcp))
        dispatch('offLoadingTable')
      })
    )
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

const countCloudChartData = (data, type) => {
  let setData = _.groupBy(data, type)

  setData = _.map(setData, (v, k) => {
    const oracle = []
    const aws = []
    const google = []
    let total = 0

    _.forEach(v, (value) => {
      if (k === value[type]) {
        if (value.cloud === 'Oracle') {
          oracle.push(value.cloud)
        } else if (value.cloud === 'AWS') {
          aws.push(value.cloud)
        } else if (value.cloud === 'Google') {
          google.push(value.cloud)
        }
      }
    })

    total = _.sum([oracle.length, aws.length, google.length])

    return {
      [type]: k,
      oracle: oracle.length,
      oraclePerc: `${_.round((oracle.length / total) * 100, '1')}%`,
      aws: aws.length,
      awsPerc: `${_.round((aws.length / total) * 100, '1')}%`,
      google: google.length,
      googlePerc: `${_.round((google.length / total) * 100, '1')}%`,
    }
  })

  return setData
}
