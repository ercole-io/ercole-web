import _ from 'lodash'
import formatDate from '@/filters/formatDate.js'
import axiosRepoService from '@/axios/axios-repoService.js'

export const state = () => ({
  repository: []
})

export const getters = {
  getRepository: (state, getters) => {
    let repos = []
    const link = `${getters.getRepoServiceBaseUrl}/all/`

    _.map(state.repository, val => {
      repos.push({
        ...val,
        ReleaseDate: formatDate(val.ReleaseDate),
        Download: `${link}${val.Filename}`
      })
    })

    return getters.filteredOrNot(repos)
  }
}

export const mutations = {
  SET_REPO_DATA: (state, payload) => {
    state.repository = payload
  }
}

export const actions = {
  async requestRepository({ commit }) {
    const repositoryData = await axiosRepoService.get('/index.json')
    const response = await repositoryData.data

    commit('SET_REPO_DATA', response)
  }
}
