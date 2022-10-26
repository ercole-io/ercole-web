import _ from 'lodash'
import formatDate from '@/filters/formatDate.js'
import { axiosRequest } from '@/services/services.js'

export const state = () => ({
  options: [],
})

export const getters = {
  getOracleOptions: (state, getters) => {
    const options = []
    _.map(state.options, (val) => {
      options.push({
        hostname: val.hostname,
        dbName: val.databasename,
        product: val.oracleDatabaseFeatureUsageStat.product,
        feature: val.oracleDatabaseFeatureUsageStat.feature,
        extraFeatureInfo: val.oracleDatabaseFeatureUsageStat.extraFeatureInfo,
        detectedUsages: val.oracleDatabaseFeatureUsageStat.detectedUsages,
        currentlyUsed: val.oracleDatabaseFeatureUsageStat.currentlyUsed,
        firstUsageDate: formatDate(
          val.oracleDatabaseFeatureUsageStat.firstUsageDate
        ),
        lastUsageDate: formatDate(
          val.oracleDatabaseFeatureUsageStat.lastUsageDate
        ),
      })
    })

    return getters.filteredOrNot(options)
  },
}

export const mutations = {
  SET_OPTIONS: (state, payload) => {
    state.options = payload
  },
}

export const actions = {
  async getOptions({ commit, dispatch }) {
    dispatch('onLoadingTable')

    const config = {
      method: 'get',
      url: 'hosts/technologies/oracle/databases/option-list',
    }

    await axiosRequest('baseApi', config).then((res) => {
      dispatch('offLoadingTable')
      commit('SET_OPTIONS', res.data)
    })
  },
}
