import _ from 'lodash'
import axios from 'axios'
import { axiosRequest } from '@/services/services.js'

const url = 'hosts/technologies/oracle/databases'

export const state = () => ({
  psqlMigrability: [],
})

export const getters = {
  getPsqlMigrability: (state, getters) => {
    const data = _.map(state.psqlMigrability, (val) => {
      let flagType = null
      if (val.flag === 'green') {
        flagType = 'is-primary'
      } else if (val.flag === 'red') {
        flagType = 'is-danger'
      } else if (val.flag === 'yellow') {
        flagType = 'is-warning'
      } else if (val.flag === '-' || val.flag === 'N/A') {
        flagType = 'N/A'
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
  SET_PSQL_MIGRABILITY_DATA: (state, payload) => {
    state.psqlMigrability = payload
  },
}

export const actions = {
  async getOraclePsqlMigrability({ commit, dispatch }) {
    dispatch('onLoadingTable')

    const endPoints = [
      `${url}/psql-migrabilities`,
      `${url}/pdbs/psql-migrabilities`,
    ]

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
          'SET_PSQL_MIGRABILITY_DATA',
          _.concat(allData[0].data, allData[1].data)
        )
        dispatch('offLoadingTable')
      })
    )
  },
}
