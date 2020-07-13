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
  dashData: {}
})

export const getters = {
  getTotalTarget: state => {
    const total = state.dashData.technologies.total
    return {
      agentsDiscovered: total.hostsCount,
      percCompliance: Math.round(total.compliance * 100),
      moneyMissing: total.unpaidDues
    }
  },
  getTechnologies: state => {
    const tech = state.dashData.technologies.technologies
    const techArray = []
    _.forEach(tech, val => {
      techArray.push({
        name: val.product,
        agents: val.hostsCount,
        perc: Math.round(val.compliance * 100),
        money: val.unpaidDues,
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
