import { axiosRequest } from '@/services/services.js'

export const state = () => ({
  dynamicMenu: [],
})

export const getters = {
  getDynamicMenu: (state) => {
    return state.dynamicMenu
  },
}

export const mutations = {
  SET_DYNAMIC_MENU: (state, payload) => {
    state.dynamicMenu = payload
  },
}

export const actions = {
  async requestDynamicMenu({ commit }) {
    const config = {
      method: 'get',
      url: 'nodes',
    }

    await axiosRequest('baseApi', config).then((res) => {
      commit('SET_DYNAMIC_MENU', res.data)
    })
  },
}
