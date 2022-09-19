export const state = () => ({
  pageNum: 1,
  perPage: 25,
  totalData: 0,
  searchTherm: null,
  sortItem: '',
  sortOrder: 'desc',
  pageLength: 0,
})

export const getters = {
  getPageNum: (state) => {
    return state.pageNum
  },
  getPerPage: (state) => {
    return state.perPage
  },
  getTotalData: (state) => {
    return state.totalData
  },
  getSearchTherm: (state) => {
    return state.searchTherm
  },
  getSortItem: (state) => {
    return state.sortItem
  },
  getSortOrder: (state) => {
    return state.sortOrder === 'desc' ? true : false
  },
  getPageLength: (state) => {
    return state.pageLength
  },
}

export const mutations = {
  SET_PAGE_NUM: (state, payload) => {
    state.pageNum = payload
  },
  SET_PER_PAGE: (state, payload) => {
    state.perPage = payload
  },
  SET_TOTAL_DATA: (state, payload) => {
    state.totalData = payload
  },
  SET_SEARCH_THERM: (state, payload) => {
    state.searchTherm = payload
  },
  SET_SORT_ITEM: (state, payload) => {
    state.sortItem = payload
  },
  SET_SORT_ORDER: (state, payload) => {
    state.sortOrder = payload
  },
  SET_PAGE_LENGTH: (state, payload) => {
    state.pageLength = payload
  },
}
