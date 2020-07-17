import axiosDefault from '../../axios/axios-default.js'
import _ from 'lodash'

const getTechValues = (techName, techs) => {
  const tech = _.find(techs, function(t) {
    return t.product === techName
  })
  if (tech) {
    return {
      agents: tech.hostsCount,
      perc: tech.compliance * 100,
      money: tech.unpaidDues
    }
  } else {
    return {
      agents: 0,
      perc: 0,
      money: 0
    }
  }
}

export const state = () => ({
  totalTarget: {},
  technologies: {},
  techData: {}
})

export const getters = {
  getTotalTarget: state => {
    return {
      agentsDiscovered: state.totalTarget.hostsCount,
      percCompliance: Math.round(state.totalTarget.compliance * 100),
      moneyMissing: state.totalTarget.unpaidDues
    }
  },
  getTechnologies: state => {
    const tech = state.technologies
    const techArray = []
    _.forEach(tech, val => {
      techArray.push({
        id: val.product,
        name: val.prettyName,
        color: val.color,
        logo: val.logo,
        values: getTechValues(val.product, state.techData)
      })
    })
    return techArray
  }
}

export const mutations = {
  SET_DASHBOARD_DATA: (state, payload) => {
    state.totalTarget = payload.dashResponse.technologies.total
    state.technologies = payload.techResponse
    state.techData = payload.dashResponse.technologies.technologies
  }
}

export const actions = {
  async getDashboardData({ commit }) {
    const dashData = await axiosDefault.get('/frontend/dashboard')
    const dashResponse = await dashData.data

    const techData = await axiosDefault.get('/settings/technologies')
    const techResponse = await techData.data

    commit('SET_DASHBOARD_DATA', { dashResponse, techResponse })
  }
}
