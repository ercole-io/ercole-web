import _ from 'lodash'
import { axiosRequest } from '@/services/services.js'
import formatDate from '@/filters/formatDate.js'

const url = 'exadata/patch-advisors'

export const state = () => ({
  exadataPA: [],
})

export const getters = {
  getExadataPA: (state, getters) => {
    let exadataPaData = []

    _.map(state.exadataPA, (val) => {
      exadataPaData.push({
        ...val,
        date: formatDate(val.date),
        fourMonthsText: val.fourMonths ? 'yes' : 'no',
        sixMonthsText: val.sixMonths ? 'yes' : 'no',
        twelveMonthsText: val.twelveMonths ? 'yes' : 'no',
      })
    })

    return getters.filteredOrNot(exadataPaData)
  },
}

export const mutations = {
  SET_EXADATA_PA: (state, payload) => {
    state.exadataPA = payload
  },
}

export const actions = {
  async requestExadatPA({ commit, dispatch }) {
    dispatch('onLoadingTable')

    const config = {
      method: 'get',
      url: url,
    }

    await axiosRequest('baseApi', config).then((res) => {
      dispatch('offLoadingTable')
      commit('SET_EXADATA_PA', res.data)
    })
  },
}
