import _ from 'lodash'
import { axiosRequest } from '@/services/services.js'

export const state = () => ({
  pdbsHosts: [],
  pdbsData: [],
  pdbsModalData: [],
  pdbsDbGrowth: [],
})

export const getters = {
  getOraclePdbs: (state) => (hostname) => {
    let data = state.pdbsData

    if (hostname !== 'All') {
      data = _.compact(
        _.map(state.pdbsData, (val) => {
          if (val.hostname === hostname) {
            return val
          }
        })
      )
    }
    return data
  },
  getOraclePdbsModal: (state) => (pdb) => {
    const pdbsModal = _.compact(
      _.map(state.pdbsModalData, (val) => {
        if (val.name === pdb) {
          return val
        }
      })
    )

    return pdbsModal
  },
  getOraclePdbsDbGrowth: (state) => (db, pdb) => {
    const dbGrowth = []
    _.map(state.pdbsDbGrowth, (data) => {
      if (db) {
        if (data.dbname === db && data.pdbname === pdb) {
          dbGrowth.push(data)
        }
      }

      if (!db) {
        if (data.pdbname === pdb) {
          dbGrowth.push(data)
        }
      }
    })

    return dbGrowth
  },
}

export const mutations = {
  SET_PDBS_HOSTS_DATA: (state, payload) => {
    state.pdbsHosts = _.uniq(_.concat('All', payload))
  },
  SET_PDBS_DATA: (state, payload) => {
    state.pdbsData = payload
  },
  SET_PDBS_MODAL_DATA: (state, payload) => {
    console.log(payload)
    state.pdbsModalData = payload
  },
  SET_DBGROWTH_PDBS: (state, payload) => {
    state.pdbsDbGrowth = payload
  },
}

export const actions = {
  async getPdbs({ commit, getters, dispatch }) {
    dispatch('onLoading')

    const config = {
      method: 'get',
      url: 'hosts/technologies/oracle/databases/pdbs',
      params: {
        'older-than': getters.getActiveFilters.date,
        environment: getters.getActiveFilters.environment,
        location: getters.getActiveFilters.location,
      },
    }

    await axiosRequest('baseApi', config).then((res) => {
      dispatch('offLoading')

      const hosts = _.map(res.data, (val) => {
        const { hostname } = val
        return hostname
      })
      commit('SET_PDBS_HOSTS_DATA', hosts)

      const pdbs = _.map(res.data, (val) => {
        const { hostname } = val
        const { allocable, charset, datafileSize, name, segmentsSize, status } =
          val.pdb
        return {
          hostname: hostname,
          allocable: allocable,
          charset: charset,
          datafileSize: datafileSize,
          name: name,
          segmentsSize: segmentsSize,
          status: status,
        }
      })
      commit('SET_PDBS_DATA', pdbs)

      const pdbsModal = _.map(res.data, (val) => {
        const { hostname } = val
        const {
          name,
          grantDba,
          partitionings,
          schemas,
          segmentAdvisors,
          services,
          tablespaces,
          pgsqlMigrability,
        } = val.pdb
        return {
          name: name,
          hostname: hostname,
          grantDba: grantDba,
          partitionings: partitionings,
          schemas: schemas,
          segmentAdvisors: segmentAdvisors,
          services: services,
          tablespaces: tablespaces,
          pgsqlMigrability: pgsqlMigrability,
        }
      })
      commit('SET_PDBS_MODAL_DATA', pdbsModal)
    })
  },
  async getPdbsByHostDbGrothData({ commit, getters, dispatch }, hostname) {
    const config = {
      method: 'get',
      url: `/hosts/technologies/oracle/databases/change-list/${hostname}/pdbs`,
      params: {
        'older-than': getters.getActiveFilters.date,
        environment: getters.getActiveFilters.environment,
        location: getters.getActiveFilters.location,
      },
    }

    await axiosRequest('baseApi', config).then((res) => {
      dispatch('offLoading')
      commit('SET_DBGROWTH_PDBS', res.data)
    })
  },
  // async getPdbsMigrablePostgreSemaphore(
  //   { commit, getters, dispatch },
  //   SET_PDBS_HOSTS_DATA
  // ) {
  //   const config = {
  //     method: 'get',
  //     url: `/hosts/${hostname}/technologies/oracle/databases/${dbname}/pdbs/${pdbname}/psql-migrabilities/semaphore`,
  //   }

  //   await axiosRequest('baseApi', config).then((res) => {
  //     console.log(res)
  //     dispatch('offLoading')
  //     // commit('SET_DBGROWTH_PDBS', res.data)
  //   })
  // },
}
