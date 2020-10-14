export const state = () => ({
  hasFilters: false,
  filters: []
})

export const getters = {}

export const mutations = {
  SET_FILTERS: (state, payload) => {
    state.hasFilters = payload.status
    state.filters = payload.filters
  }
}

export const actions = {}
