import axiosDefault from '../../axios/axios-default'
import router from '../../router/index.js'

export const state = () => ({
  hosts: null
})

export const getters = {
  getAllHosts: state => {
    return state.hosts
  }
}

export const mutations = {
  SET_HOSTS: (state, payload) => {
    state.hosts = payload
  }
}

export const actions = {
  getHosts({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      axiosDefault
        .get('/hosts')
        .then(res => {
          resolve(res)
          commit('SET_HOSTS', res.data)
        })
        .then(() => {
          dispatch('offLoading')
        })
        .catch(err => {
          reject(err)
          if (err.response.status === 401) {
            router.replace('/login')
          }
        })
    })
  }
}
