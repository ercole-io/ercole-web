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
    let data = []
    _.map(state.licenceHistory, val => {
      if (
        val.licenseTypeID !== '' ||
        val.itemDescription !== '' ||
        val.metric !== ''
      ) {
        data.push(val)
      }
    })

    data = _.sortBy(data, ['licenseTypeID'])

    _.forEach(data, (item, i) => {
      if (item.licenseTypeID === 'A90611') {
        data.splice(i, 1)
        data.unshift(item)
      }
    })

    return data
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
    dispatch('getGlobalFiltersData') // Load Gloabl Filters Selectable Data

    const dashData = await axiosDefault.get('/frontend/dashboard')
    const dashResponse = await dashData.data
    commit('SET_DASHBOARD_DATA', dashResponse)
  },
  async getLicenseHistory({ commit }) {
    const licenseHistory = await axiosChart.get(
      '/technologies/all/license-history'
    )
    const response = await licenseHistory.data.licenseComplianceHistory

    commit('SET_LICENSE_HISTORY', response)
  }
}
