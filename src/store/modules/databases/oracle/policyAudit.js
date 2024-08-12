import _ from 'lodash'
import axios from 'axios'
import { axiosRequest } from '@/services/services.js'

const url = 'hosts/technologies/oracle/databases'

export const state = () => ({
  policyAudit: [],
})

export const getters = {
  getPolicyAudit: (state, getters) => {
    const data = _.map(state.policyAudit, (val) => {
      let flagType = null
      if (val.flag === 'green') {
        flagType = 'is-primary'
      } else if (val.flag === 'red') {
        flagType = 'is-danger'
      } else {
        flagType = val.flag
      }

      return {
        ...val,
        flagType: flagType,
      }
    })

    return getters.filteredOrNot(data)
  },
}

export const mutations = {
  SET_POLICY_AUDIT_DATA: (state, payload) => {
    state.policyAudit = payload
  },
}

export const actions = {
  async getOraclePolicyAudit({ commit, dispatch }) {
    dispatch('onLoadingTable')

    const endPoints = [`${url}/policies-audit`, `${url}/pdbs/policies-audit`]

    await Promise.all(
      endPoints.map((endpoint) =>
        axiosRequest('baseApi', {
          merthod: 'get',
          url: endpoint,
        })
      )
    ).then(
      axios.spread((...allData) => {
        commit(
          'SET_POLICY_AUDIT_DATA',
          _.concat(allData[0].data, allData[1].data)
        )
        dispatch('offLoadingTable')
      })
    )
  },
}
