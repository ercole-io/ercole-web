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

export const state = () => ({
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

const ercoleTechInfo = {
  color: '#101336',
  logo: require('@/assets/images/Cerchio-blu-cane-blu.png'),
  prettyName: 'Ercole',
  product: 'Ercole',
}

export const getters = {
  getTechnologies: (state, getters) => {
    const tech = state.techDash

    let techArray = []
    let order = 0
    let product

    _.map(tech, (value, key) => {
      if (key === 'ercole') {
        order = 0
        product = 'Ercole'
      } else if (key === 'oracle') {
        order = 1
        product = 'Oracle/Database'
      } else if (key === 'sqlServer') {
        order = 2
        product = 'Microsoft/SQLServer'
      } else if (key === 'mySql') {
        order = 3
        product = 'Oracle/MySQL'
      } else if (key === 'postgreSql') {
        order = 4
        product = 'PostgreSQL/PostgreSQL'
      } else if (key === 'mongoDb') {
        order = 5
        product = 'MongoDB/MongoDB'
      }

      techArray.push({
        showOrder: order,
        id: key,
        hosts: value.hostCount,
        instances: value.count,
        perc: _.split(value.compliancePercentageVal, '.')[0],
        extra:
          product === 'Ercole'
            ? ercoleTechInfo
            : getExtraTechInfo(product, getters.getAllTechnologies),
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
    // state.totalTarget = payload.technologies.total
    state.techDash = payload
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
      url: 'frontend/dashboard',
    }

    await axiosRequest('baseApi', config).then((res) => {
      commit('SET_DASHBOARD_DATA', res.data)
    })
  },
  async getLicenseHistory({ commit }) {
    const config = {
      method: 'get',
      url: 'technologies/all/license-history',
    }

    await axiosRequest('chartApi', config).then((res) => {
      commit('SET_LICENSE_HISTORY', res.data.licenseComplianceHistory)
    })
  },
  async getCoreHosts({ commit }) {
    const config = {
      method: 'get',
      url: 'hosts/cores',
    }

    await axiosRequest('chartApi', config).then((res) => {
      commit('SET_CORE_HOSTS', res.data.coresHistory)
    })
  },
  async getCloudObjects({ commit }) {
    const endPoints = ['oracle-cloud/oci-objects', 'aws/aws-objects']

    await Promise.all(
      endPoints.map((endpoint) =>
        axiosRequest('thunderApi', {
          merthod: 'get',
          url: endpoint,
        })
      )
    ).then(
      axios.spread((...allData) => {
        const amazon = []
        if (allData[1] && allData[1].data[0]) {
          _.map(allData[1].data[0].ObjectsCount, (val) => {
            if (val.name !== 'snapshots') {
              amazon.push(val)
            }
          })
        }

        commit('SET_CLOUD_OBJECTS', {
          oracle: allData[0].data.length > 0 ? allData[0].data : [],
          amazon: allData[1].data.length > 0 ? amazon : [],
          microsoft: [],
        })
      })
    )
  },
}

const getExtraTechInfo = (techName, techs) => {
  return _.find(techs, (t) => {
    if (t.product === techName) {
      return t
    }
  })
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
