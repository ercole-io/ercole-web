export const state = () => ({
  hasFilters: false,
  filters: [],
  showCheckbox: []
})

export const getters = {
  showCheckbox: state => {
    if (state.showCheckbox[0] === 'ACK') {
      return false
    } else if (state.showCheckbox[1] === 'AGENT') {
      return false
    } else {
      return true
    }
  }
}

export const mutations = {
  SET_FILTERS: (state, payload) => {
    state.hasFilters = payload.status
    state.filters = payload.filters
    state.showCheckbox = payload.showCheckbox
  }
}

export const actions = {}
