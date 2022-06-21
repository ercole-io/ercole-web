import { axiosRequest } from '@/services/services.js'

export const state = () => ({})

export const getters = {}

export const mutations = {}

export const actions = {
  async ignoreDatabaseLicense({ commit, dispatch }, data) {
    dispatch('onLoading')

    const oracleUrl = `/hosts/${data.hostname}/technologies/${data.type}/databases/${data.database}/licenses/${data.licenseID}/ignored/${data.status}`
    const microsoftUrl = `/hosts/${data.hostname}/technologies/${data.type}/databases/${data.database}/ignored/${data.status}`
    const mysqlUrl = `/hosts/${data.hostname}/technologies/${data.type}/databases/${data.database}/ignored/${data.status}`

    const config = {
      method: 'put',
      data: {
        ignoredComment: data.comment,
      },
    }

    if (data.type === 'oracle') {
      config.url = oracleUrl
    } else if (data.type === 'microsoft') {
      config.url = microsoftUrl
    } else if (data.type === 'mysql') {
      config.url = mysqlUrl
    }

    await axiosRequest('baseApi', config).then((res) => {
      if (res.status === 200) {
        if (data.page === 'licenses-used') {
          commit('SET_IGNORE_DB_LICENSE', data)
        }
      }
      dispatch('offLoading')
    })
  },
}
