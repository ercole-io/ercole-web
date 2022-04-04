import _ from 'lodash'
import formatDate from '@/filters/formatDate.js'
import axiosRepoServiceNoLoading from '@/axios/axios-repoService-no-loading.js'

export const state = () => ({
  repository: [],
})

export const getters = {
  getRepository: (state, getters) => {
    let repos = []
    const link = `${getters.getRepoServiceBaseUrl}/all/`

    _.map(state.repository, (val) => {
      repos.push({
        ...val,
        ReleaseDate: formatDate(val.ReleaseDate),
        Download: `${link}${val.Filename}`,
      })
    })

    return getters.filteredOrNot(repos)
  },
}

export const mutations = {
  SET_REPO_DATA: (state, payload) => {
    state.repository = payload
  },
}

export const actions = {
  async requestRepository({ commit, dispatch }) {
    dispatch('onLoadingTable')

    let repositoryData
    let response

    try {
      repositoryData = await axiosRepoServiceNoLoading.get('/index.json')
      response = await repositoryData.data

      if (_.isArray(response)) {
        dispatch('offLoadingTable')
        commit('SET_REPO_DATA', response)
      } else {
        dispatch('offLoadingTable')
        commit('SET_REPO_DATA', [])
      }
    } catch {
      dispatch('offLoadingTable')
      commit('SET_REPO_DATA', [])
    }
  },
}
