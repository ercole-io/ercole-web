import axiosChart from '../../axios/axios-chart.js'

export const state = () => ({})

export const getters = {}

export const mutations = {}

export const actions = {
  async getChart() {
    const licensesData = await axiosChart.get('/technologies/types')
    const response = await licensesData.data
    console.log(response)
  }
}
