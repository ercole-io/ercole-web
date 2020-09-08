export const state = () => ({
  licensesAgreement: []
})

export const getters = {
  // getterValue: state => {
  //   return state.value
  // }
}

export const mutations = {
  SET_LICENSE_AGREEMENT: (state, payload) => {
    state.licensesAgreement.push(payload)
  }
}

export const actions = {
  // updateActionValue({ commit }) {
  //   commit('updateValue', payload)
  // }
}
