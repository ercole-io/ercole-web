import axiosDefault from '@/axios/axios-default.js'

export const state = () => ({})

export const getters = {}

export const mutations = {
  SET_IGNORE_DB_LICENSE: (state, payload) => {
    console.log(payload)
    // _.map(state.dbsLicensesUsed, (val) => {
    //   if (val.dbName === payload[0] && val.licenseTypeID === payload[1]) {
    //     val.ignore = !val.ignore
    //   }
    // })
  },
}

export const actions = {
  async ignoreDatabaseLicense({ commit }, data) {
    const ignoreLicense = await axiosDefault.put(
      `/hosts/${data.hostname}/technologies/oracle/databases/${data.database}/licenses/${data.licenseID}/${data.status}`
    )

    const response = await ignoreLicense.data
    if (response) {
      commit('SET_IGNORE_DB_LICENSE', data)
    }
  },
}
