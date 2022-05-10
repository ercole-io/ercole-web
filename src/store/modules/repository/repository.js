import _ from 'lodash'
import formatDate from '@/filters/formatDate.js'
import { axiosRequest } from '@/services/services.js'

export const state = () => ({
  repository: [],
})

export const getters = {
  getRepository: (state, getters) => {
    let repos = []
    // const link = `${getters.getRepoServiceBaseUrl}/all/`

    _.map(state.repository, (val) => {
      repos.push({
        ...val,
        ReleaseDate: formatDate(val.ReleaseDate),
        Download: val.Filename,
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

    const config = {
      method: 'get',
      url: '/index.json',
    }

    await axiosRequest('repoApi', config, false)
      .then((res) => {
        if (res.status === 200 && _.isArray(res.data)) {
          commit('SET_REPO_DATA', res.data)
          dispatch('offLoadingTable')
        } else {
          commit('SET_REPO_DATA', [])
          dispatch('offLoadingTable')
        }
      })
      .catch(() => {
        commit('SET_REPO_DATA', [])
        dispatch('offLoadingTable')
      })
  },
}
