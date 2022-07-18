import _ from 'lodash'
import formatDate from '@/filters/formatDate.js'
import { axiosRequest } from '@/services/services.js'

export const state = () => ({
  repository: [],
})

export const getters = {
  getRepository: (state, getters) => {
    let repos = []

    _.map(state.repository, (val) => {
      repos.push({
        ...val,
        ReleaseDate: formatDate(val.ReleaseDate),
        Download: `${getters.getRepoServiceBaseUrl}/all/${val.Filename}`,
        Version: formatVersion(val.Version),
      })
    })

    return getters.filteredOrNot(repos)
  },
  getRepositoryAsList:
    (state, getters) =>
    (reverse = true) => {
      const orderByDate = _.orderBy(
        getters.getRepository,
        'ReleaseDate',
        'desc'
      )
      const groupByVersion = _.groupBy(orderByDate, 'Version')
      const sortByKey = _.sortBy(Object.keys(groupByVersion))
      let reverseByKey
      if (reverse) {
        reverseByKey = _.reverse(sortByKey)
      } else {
        reverseByKey = sortByKey
      }
      // const reverseByKey = _.reverse(sortByKey)
      const reduceByKey = _.reduce(
        reverseByKey,
        (obj, key) => {
          obj[key] = groupByVersion[key]
          return obj
        },
        {}
      )
      return reduceByKey
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

const formatVersion = (agentVersion) => {
  if (agentVersion) {
    let version = _.split(agentVersion, '.')
    if (version.length > 2 && version[1].length === 1) {
      version[1] = `0${version[1]}`
    }
    version = _.join(version, '.')
    return version
  } else {
    return agentVersion
  }
}
