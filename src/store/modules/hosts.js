import axiosDefault from '../../axios/axios-default'

export const state = () => ({
  hosts: null
})

export const getters = {
  // getterValue: state => {
  //   return state.value
  // }
}

export const mutations = {
  SET_HOSTS: (state, payload) => {
    state.hosts = payload
  }
}

export const actions = {
  getHosts() {
    return axiosDefault.get('/hosts').then(res => {
      console.log(res.data)
    })
  }
}
