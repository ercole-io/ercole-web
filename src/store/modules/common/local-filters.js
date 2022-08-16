import { filterByKeys } from '@/helpers/helpers.js'

export const state = () => ({
  hasFilters: false,
  filters: [],
  showCheckbox: [],
  selectList: [],
})

export const getters = {
  filteredOrNot: (state) => (data) => {
    if (state.hasFilters) {
      return filterByKeys(data, state.filters, state.selectList)
    } else {
      return data
    }
  },
  showCheckbox: (state) => {
    if (state.showCheckbox[0] === 'ACK') {
      return false
    } else if (state.showCheckbox[1] === 'AGENT') {
      return false
    } else {
      return true
    }
  },
}

export const mutations = {
  SET_FILTERS: (state, payload) => {
    state.hasFilters = payload.status
    state.filters = payload.filters
    state.showCheckbox = payload.showCheckbox
    state.selectList = payload.selectList
  },
}

export const actions = {}
