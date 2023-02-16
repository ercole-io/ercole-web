import axiosConfigSSO from '@/axios/axios-config-sso.js'

// export const state = () => {
//   return {
//     config_sso: null,
//   }
// }

// export const getters = {
//   getConfigSSO: (state) => state.config.config_sso,
// }

// export const mutations = {
//   FETCHED_CONFIG_SSO: (state, payload) => {
//     state.config_sso = payload
//   },
// }

export const actions = {
  // eslint-disable-next-line no-empty-pattern
  async fetchConfigSSO({}) {
    return await axiosConfigSSO.get('/config_sso.json')
  },
}
