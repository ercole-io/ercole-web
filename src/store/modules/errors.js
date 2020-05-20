export const state = () => ({
  errMsg: null
})

export const getters = {
  getErrMsg: state => state.errMsg
}

export const mutations = {
  SET_ERR_MSG: (state, payload) => {
    state.errMsg = payload
  }
}

export const actions = {
  setErrMsg({ commit }, errMsg) {
    commit('SET_ERR_MSG', errMsg)
  }
}
