import _ from 'lodash'
import axios from 'axios'
import i18n from '@/i18n.js'
import { axiosRequest } from '@/services/services.js'

const url = '/hosts/technologies/oracle/exadata'

export const state = () => ({
  engSys: {},
  memory: 0,
  cpu: {
    running: 0,
    total: 0,
  },
  storage: 0,
  patching6: null,
  patching12: null,
})

const patchData = (data, months) => {
  const patched = []
  const notPatched = []

  _.map(data, (item) => {
    if (item.status) {
      patched.push([months, item.count || 0])
    } else {
      notPatched.push([months, item.count || 0])
    }
  })

  return { patched, notPatched }
}

export const getters = {
  getEngSys: (state) => {
    return state.engSys
  },
  getPatchingChartData: (state) => {
    const finalData = []
    const patch6 = patchData(
      state.patching6,
      i18n.t('views.engSystems.months', ['6'])
    )
    const patch12 = patchData(
      state.patching12,
      i18n.t('views.engSystems.months', ['12'])
    )

    finalData.push([
      {
        name: i18n.tc('views.engSystems.patching', 1),
        data: _.concat(patch6.patched, patch12.patched),
      },
      {
        name: i18n.tc('views.engSystems.patching', 2),
        data: _.concat(patch6.notPatched, patch12.notPatched),
      },
    ])

    return _.orderBy(finalData[0], ['name'], ['asc'])
  },
}

export const mutations = {
  SET_ENGINEERED_SYSTEMS: (state, payload) => {
    state.engSys = payload.engSys
    state.memory = payload.memory
    state.cpu = payload.cpu
    state.storage = payload.storage || 0
    state.patching6 = payload.patch6
    state.patching12 = payload.patch12
  },
}

export const actions = {
  async getEngineeredSystems({ commit, getters, dispatch }, olderThan = null) {
    dispatch('onLoadingTable')

    const endPoints = [
      url,
      `${url}/total-memory-size`,
      `${url}/total-cpu`,
      `${url}/average-storage-usage`,
      `${url}/patch-status?window-time=6`,
      `${url}/patch-status?window-time=12`,
    ]

    await Promise.all(
      endPoints.map((endpoint) =>
        axiosRequest('baseApi', {
          merthod: 'get',
          url: endpoint,
          params: {
            'older-than': getters.getActiveFilters.date || olderThan,
            environment: getters.getActiveFilters.environment,
            location: getters.getActiveFilters.location,
          },
        })
      )
    ).then(
      axios.spread((...allData) => {
        commit('SET_ENGINEERED_SYSTEMS', {
          engSys: allData[0].data,
          memory: allData[1].data,
          cpu: allData[2].data,
          storage: allData[3].data,
          patch6: allData[4].data,
          patch12: allData[5].data,
        })
        dispatch('offLoadingTable')
      })
    )
  },
}
