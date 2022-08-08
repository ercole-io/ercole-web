import _ from 'lodash'
import moment from 'moment'
import axios from 'axios'
import { axiosRequest } from '@/services/services.js'
import {
  setRangeDateFormat,
  checkRangeDate,
  getKeyValuePair,
} from '@/helpers/helpers.js'
import { removeDashFromMsDesc } from '@/helpers/licenses.js'

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
  oracleObjectsData: [],
  oracleObjects: {
    id: 'oracle',
    agents: 0,
    extra: {
      color: '#ff141d',
      logo: require(`@/assets/images/cloud/oracle-cloud.png`),
      name: 'Oracle Cloud',
    },
  },
  microsoftObjectsData: [],
  microsoftObjects: {
    id: 'microsoft',
    agents: 0,
    extra: {
      color: '#0089d6',
      logo: require(`@/assets/images/cloud/microsoft-azure.png`),
      name: 'Microsoft Azure',
    },
  },
  amazonObjectsData: [],
  amazonObjects: {
    id: 'amazon',
    agents: 0,
    extra: {
      color: '#252f3e',
      logo: require(`@/assets/images/cloud/amazon-aws.png`),
      name: 'Amazon AWS',
    },
  },
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
    let techArray = []
    let order = 0

    _.map(tech, (value) => {
      if (value.product === 'Oracle/Database') {
        order = 1
      } else if (value.product === 'Microsoft/SQLServer') {
        order = 2
      } else if (value.product === 'Oracle/MySQL') {
        order = 3
      } else {
        order += 1
      }

      techArray.push({
        showOrder: order,
        id: value.product,
        agents: value.hostsCount,
        perc: value.compliance * 100,
        // money: value.unpaidDues,
        extra: getExtraTechInfo(value.product, getters.getAllTechnologies),
      })
    })

    return _.orderBy(techArray, ['showOrder'])
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
        data.push({
          ...val,
          itemDescription: removeDashFromMsDesc(val.itemDescription),
          full: full,
        })
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
  getCloudObjects: (state) => {
    const oracle = calcCloudObjects(
      state.oracleObjectsData,
      state.oracleObjects,
      'oracle'
    )
    const microsoft = calcCloudObjects(
      state.microsoftObjectsData,
      state.microsoftObjects,
      'microsoft'
    )
    const amazon = calcCloudObjects(
      state.amazonObjectsData,
      state.amazonObjects,
      'amazon'
    )

    return _.concat(oracle, microsoft, amazon)
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
  SET_CLOUD_OBJECTS: (state, payload) => {
    state.oracleObjectsData = payload.oracle
    state.amazonObjectsData = payload.amazon
    state.microsoftObjectsData = payload.microsoft
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
  async getCloudObjects({ commit }) {
    const endPoints = ['/oracle-cloud/oci-objects', '/aws/aws-objects']

    await Promise.all(
      endPoints.map((endpoint) =>
        axiosRequest('thunderApi', {
          merthod: 'get',
          url: endpoint,
        })
      )
    ).then(
      axios.spread((...allData) => {
        commit('SET_CLOUD_OBJECTS', {
          oracle: allData[0].data,
          amazon: allData[1].data[0].ObjectsCount,
          microsoft: [],
        })
      })
    )
  },
}

const calcCloudObjects = (data, objs, tech) => {
  let dataSumValues = []
  let cloudObjects = []

  if (tech === 'oracle') {
    _.map(data, (values) => {
      _.map(values.objects, (obj) => {
        const { objectNumber } = obj
        dataSumValues.push(objectNumber)
      })
    })
  }

  if (tech === 'amazon') {
    _.map(data, (values) => {
      dataSumValues.push(values.count)
    })
  }

  if (tech === 'microsoft') {
    dataSumValues.push()
  }

  dataSumValues = _.sum(dataSumValues)

  cloudObjects.push({ ...objs })
  cloudObjects[0].agents = dataSumValues

  return cloudObjects
}
