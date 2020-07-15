import axiosDefault from '../../axios/axios-default.js'

export const state = () => ({
  value: 'myvalue'
})

export const getters = {
  getterValue: state => {
    return state.value
  }
}

export const mutations = {
  updateValue: (state, payload) => {
    state.value = payload
  }
}

export const actions = {
  async getLicensesData({ commit }) {
    const licensesData = await axiosDefault.get('/licenses?full=true')
    const response = await licensesData.data
    console.log(response)

    commit('updateValue')
  }
}
