import _ from 'lodash'
import formatDate from '@/filters/formatDate.js'
import { axiosRequest } from '@/services/services.js'

export const state = () => ({
  patch: [],
})

export const getters = {
  getOraclePatch: (state, getters) => {
    const patch = []
    _.map(state.patch, (val) => {
      patch.push({
        hostname: val.hostname,
        dbName: val.databasename,
        patchAction: val.oracleDatabasePatch.action,
        patchDate: formatDate(val.oracleDatabasePatch.date),
        patchDesc: val.oracleDatabasePatch.description,
        patchID: val.oracleDatabasePatch.patchID,
        patchVersion: val.oracleDatabasePatch.version,
      })
    })

    return getters.filteredOrNot(patch)
  },
}

export const mutations = {
  SET_PATCH: (state, payload) => {
    state.patch = payload
  },
}

export const actions = {
  async getPatch({ commit, dispatch }) {
    dispatch('onLoadingTable')

    const config = {
      method: 'get',
      url: '/hosts/technologies/oracle/databases/patch-list',
    }

    await axiosRequest('baseApi', config).then((res) => {
      dispatch('offLoadingTable')
      commit('SET_PATCH', res.data)
    })
  },
}
