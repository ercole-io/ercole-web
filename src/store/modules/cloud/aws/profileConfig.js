import _ from 'lodash'
import { axiosRequest } from '@/services/services.js'

const url = '/aws/configurations'

export const state = () => ({
  awsProfiles: [],
})

export const getters = {
  getAwsProfiles: (state, getters) => {
    return getters.filteredOrNot(state.awsProfiles)
  },
}

export const mutations = {
  SET_AWS_PROFILE: (state, payload) => {
    state.awsProfiles = payload
  },
  CREATE_AWS_PROFILE: (state, payload) => {
    state.awsProfiles.unshift(payload)
  },
  UPDATE_AWS_PROFILE: (state, payload) => {
    const toUpdate = _.find(state.awsProfiles, (val) => val.id === payload.id)
    Object.assign(toUpdate, payload)
  },
  DELETE_AWS_PROFILE: (state, payload) => {
    const index = _.findIndex(state.awsProfiles, (val) => val.id === payload)
    state.awsProfiles.splice(index, 1)
  },
}

export const actions = {
  async getAwsProfilesAction({ commit, dispatch }) {
    dispatch('onLoadingTable')

    const config = {
      method: 'get',
      url: url,
    }

    await axiosRequest('thunderApi', config, false).then((res) => {
      hasActiveProfile(res.data, commit)
      commit('SET_AWS_PROFILE', res.data)
      dispatch('offLoadingTable')
    })
  },
  async createAwsProfile({ commit, dispatch }, payload) {
    dispatch('onLoadingTable')

    const config = {
      method: 'post',
      url: url,
      data: payload,
    }

    await axiosRequest('thunderApi', config, false).then((res) => {
      commit('CREATE_AWS_PROFILE', res.data)
      dispatch('offLoadingTable')
    })
  },
  async updateAwsProfile({ commit, dispatch }, payload) {
    dispatch('onLoadingTable')

    const config = {
      method: 'put',
      url: `${url}/${payload.id}`,
      data: payload,
    }

    await axiosRequest('thunderApi', config, false).then((res) => {
      commit('UPDATE_AWS_PROFILE', res.data)
      dispatch('offLoadingTable')
    })
  },
  async removeAwsProfile({ commit, dispatch }, id) {
    dispatch('onLoadingTable')

    const config = {
      method: 'delete',
      url: `${url}/${id}`,
    }

    await axiosRequest('thunderApi', config, false).then(() => {
      commit('DELETE_AWS_PROFILE', id)
      dispatch('offLoadingTable')
    })
  },
  async activateAwsProfile({ commit, getters }, payload) {
    const config = {
      method: 'put',
      url: `/aws/profile-selection/profileid/${payload.id}/selected/${payload.isActive}`,
    }

    await axiosRequest('thunderApi', config, false).then(() => {
      hasActiveProfile(getters.getOciProfiles, commit)
    })
  },
}

const hasActiveProfile = (data, commit) => {
  const hasProfileActive = []
  _.map(data, (item) => {
    hasProfileActive.push(item.selected)
  })

  if (_.includes(hasProfileActive, true)) {
    commit('SET_AWS_ACTIVE_PROFILE', true)
  } else {
    commit('SET_AWS_ACTIVE_PROFILE', false)
  }
}
