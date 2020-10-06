import axiosDefault from '../../axios/axios-default'

export const state = () => ({
  addms: []
})

export const getters = {
  getOracleAddms: state => {
    return state.addms
  }
}

export const mutations = {
  SET_ADDMS: (state, payload) => {
    state.addms = payload
  }
}

export const actions = {
  async getAddms({ commit }) {
    const loc = JSON.parse(localStorage.getItem('globalFilters')).location
    const env = JSON.parse(localStorage.getItem('globalFilters')).environment
    const date = JSON.parse(localStorage.getItem('globalFilters')).date

    const addms = await axiosDefault.get(
      '/hosts/technologies/oracle/databases/addms',
      {
        params: {
          'older-than': date,
          environment: env,
          location: loc
        }
      }
    )
    const response = await addms.data
    commit('SET_ADDMS', response)
  }
}
