import _ from 'lodash'
import axios from 'axios'
import { axiosRequest } from '@/services/services.js'

const url = 'exadata'

export const state = () => ({
  engSys: {},
})

export const getters = {
  getEngSys: (state) => {
    let exadata = []
    const totalRam = '100'
    const freeRam = '0'
    const totalVcpu = '100'
    const freeVcpu = '0'

    _.map(state.engSys, (val) => {
      const KVM_HOST = _.filter(val.components, (kvm) => {
        return kvm.hostType === 'KVM_HOST'
      })

      const IBSWITCH = _.filter(val.components, (ibs) => {
        return ibs.hostType === 'IBSWITCH'
      })

      const STORAGE_CELL = _.filter(val.components, (sto) => {
        return sto.hostType === 'STORAGE_CELL'
      })

      const DOM0 = _.filter(val.components, (dom) => {
        return dom.hostType === 'DOM0'
      })

      const BARE_METAL = _.filter(val.components, (bar) => {
        return bar.hostType === 'BARE_METAL'
      })

      exadata.push({
        _id: val.rackID,
        hostname: val.hostname,
        exadata: [val.hostname],
        kvmhost: KVM_HOST,
        ibswitch: IBSWITCH,
        storagecell: STORAGE_CELL,
        dom0: DOM0,
        baremetal: BARE_METAL,
        progress: {
          totalRam: totalRam,
          freeRam: freeRam,
          totalVcpu: totalVcpu,
          freeVcpu: freeVcpu,
        },
      })
    })

    console.log(exadata)

    return exadata
  },
}

export const mutations = {
  SET_ENGINEERED_SYSTEMS: (state, payload) => {
    state.engSys = payload.engSys
  },
}

export const actions = {
  async getEngineeredSystems({ commit, getters, dispatch }, olderThan = null) {
    dispatch('onLoadingTable')

    const endPoints = [url]

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
        })
        dispatch('offLoadingTable')
      })
    )
  },
}
