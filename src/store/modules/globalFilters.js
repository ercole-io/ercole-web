import axiosNoLoading from '@/axios/axios-no-loading.js'

export const state = () => ({
  locations: {},
  environments: {},
  activeFilters: {
    location: null,
    environment: null,
    date: null
  },
  hasActiveFilters: false
})

export const getters = {
  getActiveFilters: state => {
    return state.activeFilters
  }
}

export const mutations = {
  SET_LOCATIONS: (state, payload) => {
    state.locations = payload
  },
  SET_ENVIRONMENTS: (state, payload) => {
    state.environments = payload
  },
  SET_ACTIVE_FILTERS: (state, payload) => {
    state.activeFilters = payload.active
    state.hasActiveFilters = payload.status
  }
}

export const actions = {
  async getGlobalFiltersData({ commit }) {
    const requestLocations = await axiosNoLoading.get('/hosts/locations')
    const responseLocations = await requestLocations.data
    commit('SET_LOCATIONS', responseLocations)

    const requestEnvironment = await axiosNoLoading.get('/hosts/environments')
    const responseEnvironment = await requestEnvironment.data
    commit('SET_ENVIRONMENTS', responseEnvironment)
  }
}
