import { axiosRequest } from '@/services/services.js'

export const state = () => ({})

export const getters = {}

export const mutations = {}

export const actions = {
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
      })
      .catch((err) => {
        dispatch('offLoadingTable')
        throw err.data
      })
  },
}
