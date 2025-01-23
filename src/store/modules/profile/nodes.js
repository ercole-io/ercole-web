import { axiosRequest } from '@/services/services.js'

export const state = () => ({
  // nodes: []
})

export const getters = {
  // showNodes: (state) => {
  //   return state.nodes
  // },
}

export const mutations = {
  // SET_NODES: (state, payload) => {
  //   state.nodes = payload
  // },
}

export const actions = {
  // async getNodes({ commit, dispatch }) {
  //   dispatch('onLoadingTable')

  //   const config = {
  //     method: 'get',
  //     url: 'nodes',
  //   }

  //   await axiosRequest('baseApi', config).then((res) => {
  //     commit('SET_NODES', res.data)
  //     dispatch('offLoadingTable')
  //   })
  // },
  // eslint-disable-next-line no-empty-pattern
  async getNode({}, nodename) {
    const config = {
      method: 'get',
      url: `/admin/nodes/${nodename}`,
    }

    return await axiosRequest('baseApi', config)
  },
  async createNode({ dispatch }, payload) {
    dispatch('onLoadingTable')

    const config = {
      method: 'post',
      url: 'admin/nodes',
      data: payload,
    }

    await axiosRequest('baseApi', config).then(() => {
      dispatch('getNodes')
      dispatch('offLoadingTable')
    })
  },
  async updateNode({ dispatch }, payload) {
    dispatch('onLoadingTable')

    const config = {
      method: 'put',
      url: `admin/nodes/${payload.nodename}`,
      data: payload.data,
    }

    await axiosRequest('baseApi', config).then(() => {
      dispatch('getNodes')
      dispatch('offLoadingTable')
    })
  },
  async deleteNode({ dispatch }, nodename) {
    dispatch('onLoadingTable')

    const config = {
      method: 'delete',
      url: `admin/nodes/${nodename}`,
    }

    await axiosRequest('baseApi', config)
      .then(() => {
        dispatch('getNodes')
        dispatch('offLoadingTable')
      })
      .catch((err) => {
        dispatch('offLoadingTable')
        throw err.data
      })
  },
}
