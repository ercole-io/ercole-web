import axiosDefault from '../../axios/axios-default'

export const state = () => ({
  addms: {}
})

export const getters = {}

export const mutations = {
  SET_ADDMS: (state, payload) => {
    state.addms = payload
  }
}

export const actions = {
  async getAddms({ commit }) {
    const addms = await axiosDefault.get(
      '/hosts/technologies/oracle/databases/addms'
    )
    const response = await addms.data
    commit('SET_ADDMS', response)
  }
}
