import _ from 'lodash'
import axios from 'axios'
import { axiosRequest } from '@/services/services.js'

export const state = () => ({
  noDataAgents: [],
  missingDbs: [],
  vHostsNoCluster: [],
  recommendationErrors: [],
})

export const getters = {}

export const mutations = {
  SET_NO_DATA_AGENTS: (state, payload) => {
    const getDays = _.map(payload, (val) => {
      let days = _.split(val.description, ' ')

      return {
        ...val,
        daysFromCreation: _.nth(days, -2),
      }
    })

    state.noDataAgents = getDays
  },
  SET_MISSING_DBS: (state, payload) => {
    state.missingDbs = payload
  },
  SET_V_HOSTS_NO_CLUSTER: (state, payload) => {
    state.vHostsNoCluster = payload
  },
  SET_RECOMMENDATION_ERRORS: (state, payload) => {
    state.recommendationErrors = payload
  },
}

export const actions = {
  async getNoDataAgents({ commit }) {
    const config = {
      method: 'get',
      url: '/alerts?status=NEW&code=NO_DATA&page=1&size=999999',
    }
    await axiosRequest('baseApi', config).then((res) => {
      commit('SET_NO_DATA_AGENTS', res.data.items || [])
    })
  },
  async getMissingDbs({ commit }) {
    const config = {
      method: 'get',
      url: '/hosts/missing-dbs',
    }
    await axiosRequest('baseApi', config).then((res) => {
      commit('SET_MISSING_DBS', res.data)
    })
  },
  async getvHostsNoCluster({ commit }) {
    const config = {
      method: 'get',
      url: '/hosts/no-clusters',
    }
    await axiosRequest('baseApi', config).then((res) => {
      commit('SET_V_HOSTS_NO_CLUSTER', res.data)
    })
  },
  async getRecommendationErrors({ commit, dispatch }) {
    dispatch('onLoadingTable')

    const endPoints = [
      `oracle-cloud/oci-recommendation-errors/1`,
      `aws/aws-recommendation-errors/9`,
      `gcp/errors`,
    ]

    await Promise.all(
      endPoints.map((endpoint) =>
        axiosRequest('thunderApi', {
          merthod: 'get',
          url: endpoint,
        })
      )
    )
      .then(
        axios.spread((...allData) => {
          let oci = []
          let aws = []
          let gcp = []

          _.forEach(allData, (data) => {
            if (_.includes(data.config.url, 'oci')) {
              oci = _.map(data.data, (val) => {
                return {
                  ...val,
                  cloud: 'Oracle',
                }
              })
            } else if (_.includes(data.config.url, 'aws')) {
              aws = _.map(data.data, (val) => {
                return {
                  ...val,
                  cloud: 'AWS',
                }
              })
            } else if (_.includes(data.config.url, 'gcp')) {
              gcp = _.map(data.data, (val) => {
                return {
                  ...val,
                  cloud: 'Google',
                }
              })
            }
          })

          const data = _.orderBy(
            _.concat(oci, aws, gcp),
            ['createdAt'],
            ['asc']
          )

          commit('SET_RECOMMENDATION_ERRORS', data)
        })
      )
      .then(() => {
        dispatch('offLoadingTable')
      })
  },
}
