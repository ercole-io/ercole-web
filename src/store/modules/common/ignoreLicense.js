import { axiosRequest } from '@/services/services.js'

export const state = () => ({})

export const getters = {}

export const mutations = {}

export const actions = {
  ignoreDatabaseLicense(_, data) {
    const oracleUrl = `hosts/${data.hostname}/technologies/${data.type}/databases/${data.database}/licenses/${data.licenseID}/ignored/${data.status}`
    const microsoftUrl = `hosts/${data.hostname}/technologies/${data.type}/databases/${data.database}/ignored/${data.status}`
    const mysqlUrl = `hosts/${data.hostname}/technologies/${data.type}/databases/${data.database}/ignored/${data.status}`

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

    return axiosRequest('baseApi', config)
  },
  ignoreDatabaseLicensesByGroup(_, data) {
    const config = {
      method: 'post',
      url: '/licenses/ignore',
      data: data,
    }

    return axiosRequest('baseApi', config)
  },
}
