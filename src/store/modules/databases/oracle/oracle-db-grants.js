import _ from 'lodash'
import { axiosRequest } from '@/services/services.js'
import toLower from '@/filters/toLower.js'

export const state = () => ({
  dbGrants: [],
})

export const getters = {
  getOracleDbGrants: (state, getters) => {
    const dbGrants = state.dbGrants
    const grants = []

    _.map(dbGrants, (val) => {
      const defaultRole =
        toLower(val.oracleGrantDba.defaultRole) === 'yes' ? true : false
      const adminOption =
        toLower(val.oracleGrantDba.adminOption) === 'yes' ? true : false

      grants.push({
        dbName: val.databasename,
        hostname: val.hostname,
        adminOption: adminOption,
        defaultRole: defaultRole,
        grantee: val.oracleGrantDba.grantee,
      })
    })

    return getters.filteredOrNot(grants)
  },
}

export const mutations = {
  SET_DB_GRANTS: (state, payload) => {
    state.dbGrants = payload
  },
}

export const actions = {
  async getDbGrants({ commit, dispatch }) {
    dispatch('onLoadingTable')

    const config = {
      method: 'get',
      url: '/hosts/technologies/all/databases/grant-dba',
    }

    await axiosRequest('baseApi', config).then((res) => {
      commit('SET_DB_GRANTS', res.data)
      dispatch('offLoadingTable')
    })
  },
}
