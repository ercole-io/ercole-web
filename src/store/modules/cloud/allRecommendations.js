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
