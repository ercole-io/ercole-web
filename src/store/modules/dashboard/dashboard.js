import _ from 'lodash'
import moment from 'moment'
import { axiosRequest } from '@/services/services.js'
import {
  setRangeDateFormat,
  checkRangeDate,
  getKeyValuePair,
} from '@/helpers/helpers.js'
import oracleCloud from '@/store/modules/dashboard/oci-cloud.json'

const getExtraTechInfo = (techName, techs) => {
  const tech = _.find(techs, (t) => {
    return t.product === techName
  })
  if (tech) {
    return {
      color: tech.color,
      logo: tech.logo,
      name: tech.prettyName,
    }
  }
}

export const state = () => ({
  totalTarget: {},
  techDash: {},
  licenceHistory: {},
  coreHosts: {},
  cloudObjects: [
    {
      id: 'oracle',
      agents: 0,
      perc: 0,
      extra: {
        color: '#ff141d',
        logo: require(`@/assets/images/cloud/oracle-cloud.png`),
        name: 'Oracle Cloud',
      },
    },
    {
      id: 'microsoft',
      agents: 0,
      perc: 0,
      extra: {
        color: '#0089d6',
        logo: require(`@/assets/images/cloud/microsoft-azure.png`),
        name: 'Microsoft Azure',
      },
    },
    {
      id: 'amazon',
      agents: 0,
      perc: 0,
      extra: {
        color: '#252f3e',
        logo: require(`@/assets/images/cloud/amazon-aws.png`),
        name: 'Amazon AWS',
      },
    },
  ],
})

export const getters = {
  getTotalTarget: (state) => {
    // return {
    //   agentsDiscovered: state.totalTarget.hostsCount,
    //   percCompliance: Math.round(state.totalTarget.compliance * 100),
    //   moneyMissing: state.totalTarget.unpaidDues,
    // }
    const ercoleAgent = {
      id: 'ercoleAgent',
      agents: state.totalTarget.hostsCount,
      perc: Math.round(state.totalTarget.compliance * 100),
      extra: {
        color: '#101336',
        name: 'Ercole',
      },
    }

    return ercoleAgent
  },
  getTechnologies: (state, getters) => {
    const tech = state.techDash
    const techArray = []
    _.map(tech, (value) => {
      techArray.push({
        id: value.product,
        agents: value.hostsCount,
        perc: value.compliance * 100,
        // money: value.unpaidDues,
        extra: getExtraTechInfo(value.product, getters.getAllTechnologies),
      })
    })

    return techArray
  },
  getCloudObjects: (state) => {
    let oracleValues = []
    let oraclePerc
    let oracleSum

    _.map(oracleCloud, (values) => {
      _.map(values.objects, (obj) => {
        const { objectNumber } = obj
        oracleValues.push(objectNumber)
      })
    })

    oracleSum = _.sum(oracleValues)
    oraclePerc = ((oracleSum / oracleValues.length) * 100) / 10

    const cloudObj = []
    _.map(state.cloudObjects, (cloud) => {
      if (cloud.id === 'oracle') {
        cloudObj.push({
          ...cloud,
          agents: oracleSum,
          perc: oraclePerc,
        })
      } else {
        cloudObj.push({
          ...cloud,
        })
      }
    })

    return cloudObj
  },
  getChartLicenseHistory: (state) => {
    let data = []
    _.map(state.licenceHistory, (val) => {
      const full = `${val.licenseTypeID} - ${val.itemDescription} - ${val.metric}`
      if (
        val.licenseTypeID !== '' ||
        val.itemDescription !== '' ||
        val.metric !== ''
      ) {
        data.push({ ...val, full: full })
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
  },
  getChartCoreHosts: (state, getters, rootState) => {
    const organizeData = []

    _.map(state.coreHosts, (val) => {
      const { cores, date } = val
      let newDate = setRangeDateFormat(date)

      if (checkRangeDate(newDate, rootState.rangeDates.rangeDatesAlt)) {
        organizeData.push({
          date: moment(date).format('ll'),
          value: cores,
        })
      }
    })

    const coreHostsData = []
    coreHostsData.push({
      name: '',
      data: getKeyValuePair(organizeData, 'date', 'value'),
    })

    return coreHostsData
  },
}

export const mutations = {
  SET_DASHBOARD_DATA: (state, payload) => {
    state.totalTarget = payload.technologies.total
    state.techDash = payload.technologies.technologies
  },
  SET_LICENSE_HISTORY: (state, payload) => {
    state.licenceHistory = payload
  },
  SET_CORE_HOSTS: (state, payload) => {
    state.coreHosts = payload
  },
}

export const actions = {
  async getDashboardData({ commit }) {
    const config = {
      method: 'get',
      url: '/frontend/dashboard',
    }

    await axiosRequest('baseApi', config).then((res) => {
      commit('SET_DASHBOARD_DATA', res.data)
    })
  },
  async getLicenseHistory({ commit }) {
    const config = {
      method: 'get',
      url: '/technologies/all/license-history',
    }

    await axiosRequest('chartApi', config).then((res) => {
      commit('SET_LICENSE_HISTORY', res.data.licenseComplianceHistory)
    })
  },
  async getCoreHosts({ commit }) {
    const config = {
      method: 'get',
      url: '/hosts/cores',
    }

    await axiosRequest('chartApi', config).then((res) => {
      commit('SET_CORE_HOSTS', res.data.coresHistory)
    })
  },
}
