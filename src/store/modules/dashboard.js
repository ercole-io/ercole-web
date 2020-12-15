import axiosDefault from '@/axios/axios-default.js'
import axiosChart from '@/axios/axios-chart.js'
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
  techDash: {},
  licenceHistory: {}
})

export const getters = {
  getTotalTarget: state => {
    return {
      agentsDiscovered: state.totalTarget.hostsCount,
      percCompliance: Math.round(state.totalTarget.compliance * 100),
      moneyMissing: state.totalTarget.unpaidDues
    }
  },
  getTechnologies: (state, getters) => {
    const tech = state.techDash
    const techArray = []
    _.map(tech, value => {
      techArray.push({
        id: value.product,
        agents: value.hostsCount,
        perc: value.compliance * 100,
        money: value.unpaidDues,
        extra: getExtraTechInfo(value.product, getters.getAllTechnologies)
      })
    })
    return techArray
  },
  getChartLicenseHistory: state => {
    return state.licenceHistory
  }
}

export const mutations = {
  SET_DASHBOARD_DATA: (state, payload) => {
    state.totalTarget = payload.technologies.total
    state.techDash = payload.technologies.technologies
  },
  SET_LICENSE_HISTORY: (state, payload) => {
    state.licenceHistory = payload
  }
}

export const actions = {
  async getDashboardData({ commit, dispatch }) {
    const dashData = await axiosDefault.get('/frontend/dashboard')
    const dashResponse = await dashData.data
    commit('SET_DASHBOARD_DATA', dashResponse)

    dispatch('getGlobalFiltersData')
    dispatch('getTechnologiesData')
    dispatch('getHosts')
  },
  async getLicenseHistory({ commit }) {
    const licenseHistory = await axiosChart.get(
      '/technologies/oracle/license-history'
    )
    const response = await licenseHistory.data

    commit('SET_LICENSE_HISTORY', response)
  }
}
