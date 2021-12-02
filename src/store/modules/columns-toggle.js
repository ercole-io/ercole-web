export const state = () => ({
  'page-mysqlAgreements': [true, true],
  'page-oracleAgreements': [true, true],
  'page-licensesCompliance': [true, true],
  'page-licensesUsedHosts': [true, true],
  'page-licensesUsedDbs': [true, true],
  'page-licensesUsedClusters': [true, true],
  'page-alerts': [true, true],
  'page-hypervisors': [true, true],
  'page-clusters': [true, true],
  'page-databases': [true, true],
  'page-databasesOracle': [true, true],
  'page-addm': [true, true],
  'page-patchAdvisor': [true, true],
  'page-segmentAdvisor': [true, true],
  'page-databasesMysql': [true, true],
  'page-hosts': [true, true],
  'page-repository': [true, true],
  'page-profileConfig': [true, true],
  'page-loadBalancers': [true, true],
  'page-recommendations': [true, true],
})

export const getters = {
  getColumnsStatus: (state) => (page) => {
    return state['page-' + page]
  },
}

export const mutations = {
  SET_HIDDEN_COLS: (state, payload) => {
    state['page-' + payload.name] = payload.values
  },
}
