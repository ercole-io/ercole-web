import axiosDefault from '@/axios/axios-default.js'

export const state = () => ({
  ignoreLicenseDbTabActive: 0,
  setLicensesSubTabActive: 0,
})

export const getters = {
  getIgnoreLicenseDbTabActive: (state) => {
    return state.ignoreLicenseDbTabActive
  },
  getLicensesSubTabActive: (state) => {
    return state.setLicensesSubTabActive
  },
}

export const mutations = {
  SET_IGNORE_LICENSE_ACTIVE_DB_TAB: (state, payload) => {
    state.ignoreLicenseDbTabActive = payload
  },
  SET_LICENMSES_SUB_TAB_ACTIVE: (state, payload) => {
    state.setLicensesSubTabActive = payload
  },
}

export const actions = {
  async ignoreDatabaseLicense({ commit }, data) {
    const ignoreLicense = await axiosDefault.put(
      `/hosts/${data.hostname}/technologies/oracle/databases/${data.database}/licenses/${data.licenseID}/ignored/${data.status}`
    )

    const response = await ignoreLicense
    if (response.status === 200) {
      if (data.page === 'licenses-used') {
        commit('SET_IGNORE_DB_LICENSE', data)
      }
    }
  },
}
