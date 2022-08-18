import _ from 'lodash'
import { axiosRequest } from '@/services/services.js'

export const state = () => ({
  backups: [],
})

export const getters = {
  getOracleBackups: (state, getters) => {
    const backups = []
    _.map(state.backups, (val) => {
      backups.push({
        hostname: val.hostname,
        dbName: val.databasename,
        avgBckSize: val.oracleDatabaseBackup.avgBckSize,
        backupType: val.oracleDatabaseBackup.backupType,
        hour: val.oracleDatabaseBackup.hour,
        retention: val.oracleDatabaseBackup.retention,
        weekDays: val.oracleDatabaseBackup.weekDays,
      })
    })
    return getters.filteredOrNot(backups)
  },
}

export const mutations = {
  SET_BACKUPS: (state, payload) => {
    state.backups = payload
  },
}

export const actions = {
  async getBackups({ commit, dispatch }) {
    dispatch('onLoadingTable')

    const config = {
      method: 'get',
      url: '/hosts/technologies/oracle/databases/backup-list',
    }

    await axiosRequest('baseApi', config).then((res) => {
      dispatch('offLoadingTable')
      commit('SET_BACKUPS', res.data)
    })
  },
}
