export const state = () => {
  return {
    isLoading: false
  }
}

export const getters = {
  loadingStatus: state => state.isLoading
}

export const mutations = {
  LOADING_ON: state => {
    state.isLoading = true
  },
  LOADING_OFF: state => {
    state.isLoading = false
  }
}

export const actions = {
  onLoading({ commit }) {
    commit('LOADING_ON')
  },
  offLoading({ commit }) {
    commit('LOADING_OFF')
  }
}
