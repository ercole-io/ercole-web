import axiosDefault from '../../axios/axios-default.js'
import _ from 'lodash'

function getRandomColor() {
  var letters = '0123456789ABCDEF'
  var color = '#'
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

export const state = () => ({
  dashData: null
})

export const getters = {
  getTotalTarget: state => {
    const total = state.dashData.Technologies.Total
    return {
      agentsDiscovered: total.HostsCount,
      percCompliance: Math.round(total.Compliance * 100),
      moneyMissing: total.UnpaidDues
    }
  },
  getTechnologies: state => {
    const tech = state.dashData.Technologies.Technologies
    const techArray = []
    _.forEach(tech, val => {
      techArray.push({
        name: val.Product,
        agents: val.HostsCount,
        perc: Math.round(val.Compliance * 100),
        money: val.UnpaidDues,
        color: getRandomColor()
      })
    })
    return techArray
  }
}

export const mutations = {
  SET_DASHBOARD_DATA: (state, payload) => {
    state.dashData = payload
  }
}

export const actions = {
  async getDashboardData({ commit }) {
    const dashData = await axiosDefault.get('/frontend/dashboard')
    const response = await dashData.data
    commit('SET_DASHBOARD_DATA', response)
  }
}
