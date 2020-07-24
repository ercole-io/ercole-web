import axiosDefault from '../../axios/axios-default.js'
import _ from 'lodash'

const getExtraTechInfo = (techName, techs) => {
  const tech = _.find(techs, t => {
    return t.product === techName
  })
  if (tech) {
    return {
      color: tech.color,
      logo: tech.logo,
      name: tech.prettyName
    }
  }
}

export const state = () => ({
  totalTarget: {},
  technologies: {},
  techDash: {}
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
    const tech = state.techDash
    const techArray = []
    _.map(tech, value => {
      techArray.push({
        id: value.product,
        agents: value.hostsCount,
        perc: value.compliance * 100,
        money: value.unpaidDues,
        extra: getExtraTechInfo(value.product, state.technologies)
      })
    })
    return techArray
  }
}

export const mutations = {
  SET_DASHBOARD_DATA: (state, payload) => {
    state.totalTarget = payload.dashResponse.technologies.total
    state.technologies = payload.techResponse
    state.techDash = payload.dashResponse.technologies.technologies
  }
}

export const actions = {
  async getDashboardData({ commit }) {
    const dashData = await axiosDefault.get('/frontend/dashboard')
    const dashResponse = await dashData.data

    const techDash = await axiosDefault.get('/settings/technologies')
    const techResponse = await techDash.data

    commit('SET_DASHBOARD_DATA', { dashResponse, techResponse })
  }
}
