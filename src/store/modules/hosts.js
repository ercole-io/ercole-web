import axiosDefault from '../../axios/axios-default'
import _ from 'lodash'
import moment from 'moment'

export const state = () => ({
  hosts: {},
  currentHost: {}
})

export const getters = {
  getAllHosts: state => {
    return state.hosts
  },
  getCurrentHost: state => {
    return state.currentHost
  },
  getGpuGrowthChart: state => {
    // calc total daily
    const totalDailyState = state.currentHost.history
    const totalDailyData = []
    let resultTotalDaily = {}

    _.map(totalDailyState, item => {
      totalDailyData.push({
        date: moment(item.createdAt).format(),
        value: item.totalDailyCPUUsage
      })
    })

    for (const prop in totalDailyData) {
      resultTotalDaily[totalDailyData[prop].date] = totalDailyData[prop].value
    }

    // calc daily per db
    const dailyDbState = state.currentHost.features.oracle.database.databases
    const dailyDbData = []

    _.map(dailyDbState, item => {
      const { name, changes } = item
      let changed = _.map(changes, data => {
        return {
          date: moment(data.updated).format(),
          value: data.dailyCPUUsage
        }
      })

      const changedResult = {}
      for (const prop in changed) {
        changedResult[changed[prop].date] = changed[prop].value
      }

      dailyDbData.push({
        name: name,
        data: changedResult
      })
    })

    const finalResult = [
      { name: 'Total Daily CPU Usage', data: resultTotalDaily }
    ]

    _.forEach(dailyDbData, item => {
      finalResult.push(item)
    })

    return finalResult
  }
}

export const mutations = {
  SET_HOSTS: (state, payload) => {
    state.hosts = payload
  },
  SET_CURRENT_HOST: (state, payload) => {
    state.currentHost = payload
  }
}

export const actions = {
  async getHosts({ commit }) {
    const hostsData = await axiosDefault.get('/hosts')
    const response = await hostsData.data
    commit('SET_HOSTS', response)
  },
  async getHostByName({ commit }, hostname) {
    const hostByName = await axiosDefault.get(`/hosts/${hostname}`)
    const response = await hostByName.data
    commit('SET_CURRENT_HOST', response)
  }
}
