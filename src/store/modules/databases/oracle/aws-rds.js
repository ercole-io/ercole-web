import { axiosRequest } from '@/services/services.js'

export const state = () => ({
  awsRdsDbs: [],
})

export const getters = {
  returnAwsRdsDbs: (state) => {
    return state.awsRdsDbs
  },
}

export const mutations = {
  SET_AWSRDS_DBS: (state, payload) => {
    state.awsRdsDbs = payload
  },
}

export const actions = {
  async getAwsRdsDbs({ commit }) {
    const config = {
      method: 'get',
      url: 'aws/rds',
    }

    await axiosRequest('thunderApi', config).then((res) => {
      commit('SET_AWSRDS_DBS', res.data.awsDbInstances)
    })
  },
}
