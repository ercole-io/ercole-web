import { axiosRequest } from '@/services/services.js'

export const state = () => ({
  locations: {},
  environments: {},
  activeFilters: {
    location: null,
    environment: null,
    date: null,
  },
  hasActiveFilters: false,
  isFilterOpened: false,
})

export const getters = {
  getActiveFilters: (state) => {
    return state.activeFilters
  },
  getLocations: (state) => {
    return state.locations
  },
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
  },
  SET_OPEN_FILTERS: (state, payload) => {
    state.isFilterOpened = payload
  },
}

export const actions = {
  async getGlobalFiltersLocations({ commit }) {
    const config = {
      method: 'get',
      url: 'hosts/locations',
    }
    await axiosRequest('baseApi', config).then((res) => {
      commit('SET_LOCATIONS', res.data)
    })
  },
  async getGlobalFiltersEnvironments({ commit }) {
    const config = {
      method: 'get',
      url: 'hosts/environments',
    }
    await axiosRequest('baseApi', config).then((res) => {
      commit('SET_ENVIRONMENTS', res.data)
    })
  },
}
