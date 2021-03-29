import axiosNoLoading from '@/axios/axios-no-loading.js'
import axiosChartNoLoading from '@/axios/axios-chart-no-loading.js'
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
      if (val.licenseTypeID !== '') {
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
    dispatch('onLoading')

    dispatch('getLicenseHistory') // Licenses Chart
    dispatch('getAlertsData', { status: 'NEW' }) // Alerts Boxes
    dispatch('getTechnologiesData') // Technology Box
    dispatch('getGlobalFiltersData') // Load Gloabl Filters Selectable Data

    const dashData = await axiosNoLoading.get('/frontend/dashboard')
    const dashResponse = await dashData.data
    commit('SET_DASHBOARD_DATA', dashResponse)
  },
  async getLicenseHistory({ commit }) {
    const licenseHistory = await axiosChartNoLoading.get(
      '/technologies/oracle/license-history'
    )
    const response = await licenseHistory.data

    commit('SET_LICENSE_HISTORY', response)
  }
}
