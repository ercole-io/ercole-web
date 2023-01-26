import _ from 'lodash'
import { axiosRequest } from '@/services/services.js'

const oracleUrl = 'oracle-cloud/configurations'
const awsUrl = 'aws/configurations'
const azureUrl = 'azure/configurations'

export const state = () => ({
  cloudProfiles: [],
})

export const getters = {
  returnCloudProfiles: (state, getters) => {
    return getters.filteredOrNot(state.cloudProfiles)
  },
  hasActiveProfiles: (state) => {
    const hasProfileActive = []
    _.map(state.cloudProfiles, (item) => {
      hasProfileActive.push(_.toString(item.selected))
    })
    return _.includes(hasProfileActive, 'true')
  },
}

export const mutations = {
  SET_CLOUD_PROFILE: (state, payload) => {
    state.cloudProfiles = payload
  },
  CREATE_CLOUD_PROFILE: (state, payload) => {
    state.cloudProfiles.unshift(payload)
  },
  UPDATE_CLOUD_PROFILE: (state, payload) => {
    const toUpdate = _.find(state.cloudProfiles, (val) => val.id === payload.id)
    Object.assign(toUpdate, payload)
  },
  DELETE_CLOUD_PROFILE: (state, payload) => {
    const index = _.findIndex(state.cloudProfiles, (val) => val.id === payload)
    state.cloudProfiles.splice(index, 1)
  },
}

export const actions = {
  async getCloudProfiles({ commit, getters, dispatch }) {
    dispatch('onLoadingTable')

    let url = null
    if (getters.returnCloudTechnology === 'Oracle') {
      url = oracleUrl
    } else if (getters.returnCloudTechnology === 'Aws') {
      url = awsUrl
    } else if (getters.returnCloudTechnology === 'Azure') {
      url = azureUrl
    }

    const config = {
      method: 'get',
      url: url,
    }

    await axiosRequest('thunderApi', config).then((res) => {
      commit('SET_CLOUD_PROFILE', res.data)
      if (getters.returnCloudTechnology === 'Oracle') {
        commit('SET_CLOUD_ACTIVE_PROFILE', [getters.hasActiveProfiles, 'oci'])
      } else if (getters.returnCloudTechnology === 'Aws') {
        commit('SET_CLOUD_ACTIVE_PROFILE', [getters.hasActiveProfiles, 'aws'])
      } else if (getters.returnCloudTechnology === 'Azure') {
        commit('SET_CLOUD_ACTIVE_PROFILE', [getters.hasActiveProfiles, 'azure'])
      }
      dispatch('offLoadingTable')
    })
  },
  async createCloudProfile({ commit, getters, dispatch }, payload) {
    dispatch('onLoadingTable')

    let url = null
    if (getters.returnCloudTechnology === 'Oracle') {
      url = oracleUrl
    } else if (getters.returnCloudTechnology === 'Aws') {
      url = awsUrl
    } else if (getters.returnCloudTechnology === 'Azure') {
      url = azureUrl
    }

    const config = {
      method: 'post',
      url: url,
      data: payload,
    }

    await axiosRequest('thunderApi', config).then((res) => {
      commit('CREATE_CLOUD_PROFILE', res.data)
      dispatch('offLoadingTable')
    })
  },
  async updateCloudProfile({ commit, getters, dispatch }, payload) {
    dispatch('onLoadingTable')

    let url = null
    if (getters.returnCloudTechnology === 'Oracle') {
      url = oracleUrl
    } else if (getters.returnCloudTechnology === 'Aws') {
      url = awsUrl
    } else if (getters.returnCloudTechnology === 'Azure') {
      url = azureUrl
    }

    const config = {
      method: 'put',
      url: `${url}/${payload.id}`,
      data: payload,
    }

    await axiosRequest('thunderApi', config).then((res) => {
      commit('UPDATE_CLOUD_PROFILE', res.data)
      dispatch('offLoadingTable')
    })
  },
  async removeCloudProfile({ commit, getters, dispatch }, id) {
    dispatch('onLoadingTable')

    let url = null
    if (getters.returnCloudTechnology === 'Oracle') {
      url = oracleUrl
    } else if (getters.returnCloudTechnology === 'Aws') {
      url = awsUrl
    } else if (getters.returnCloudTechnology === 'Azure') {
      url = azureUrl
    }

    const config = {
      method: 'delete',
      url: `${url}/${id}`,
    }

    await axiosRequest('thunderApi', config).then(() => {
      commit('DELETE_CLOUD_PROFILE', id)
      dispatch('offLoadingTable')
    })
  },
  async activateCloudProfile({ getters }, payload) {
    let url = null
    if (getters.returnCloudTechnology === 'Oracle') {
      url = `oracle-cloud/profile-selection/profileid/${payload.id}/selected/${payload.isActive}`
    } else if (getters.returnCloudTechnology === 'Aws') {
      url = `aws/profile-selection/profileid/${payload.id}/selected/${payload.isActive}`
    } else if (getters.returnCloudTechnology === 'Azure') {
      url = `azure/profile-selection/profileid/${payload.id}/selected/${payload.isActive}`
    }

    const config = {
      method: 'put',
      url: url,
    }

    await axiosRequest('thunderApi', config)
  },
}
