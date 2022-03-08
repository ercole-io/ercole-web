export const state = () => {
  return {
    isLoading: false,
    isLoadingTable: false,
  }
}

export const getters = {
  loadingStatus: (state) => state.isLoading,
  loadingTableStatus: (state) => state.isLoadingTable,
}

export const mutations = {
  LOADING_ON: (state) => {
    state.isLoading = true
  },
  LOADING_OFF: (state) => {
    state.isLoading = false
  },
  LOADING_TABLE_ON: (state) => {
    state.isLoadingTable = true
  },
  LOADING_TABLE_OFF: (state) => {
    state.isLoadingTable = false
  },
}

export const actions = {
  onLoading({ commit }) {
    commit('LOADING_ON')
  },
  offLoading({ commit }) {
    commit('LOADING_OFF')
  },
  onLoadingTable({ commit }) {
    commit('LOADING_TABLE_ON')
  },
  offLoadingTable({ commit }) {
    commit('LOADING_TABLE_OFF')
  },
}
