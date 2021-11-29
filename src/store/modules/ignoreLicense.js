import axiosDefault from '@/axios/axios-default.js'

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
