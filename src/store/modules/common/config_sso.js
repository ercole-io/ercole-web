import axiosConfigSSO from '@/axios/axios-config-sso.js'

export const actions = {
  // eslint-disable-next-line no-empty-pattern
  async fetchConfigSSO() {
    return await axiosConfigSSO.get('/config_sso.json')
  },
}
