const defaultState = () => ({
  'page-mysqlAgreements': [false, true],
  'page-oracleAgreements': [false, true],
  'page-licensesCompliance': [false, true],
  'page-licensesUsedHosts': [false, true],
  'page-licensesUsedDbs': [false, true],
  'page-licensesUsedClusters': [false, true],
  'page-alerts': [false, true],
  'page-hypervisors': [false, true],
  'page-clusters': [false, true],
  'page-databases': [false, true],
  'page-databasesOracle': [false, true],
  'page-addm': [false, true],
  'page-patchAdvisor': [false, true],
  'page-segmentAdvisor': [false, true],
  'page-databasesMysql': [false, true],
  'page-hosts': [false, true],
  'page-repository': [false, true],
  'page-profileConfig': [false, true],
  'page-recommendations': [false, true],
  'page-ercoleRecommendations': [false, true],
  'page-databasesMsSqlServer': [false, true],
})

export const state = defaultState()

export const getters = {
  getColumnsStatus: (state) => (page) => {
    return state['page-' + page]
  },
}

export const mutations = {
  SET_HIDDEN_COLS: (state, payload) => {
    state['page-' + payload.name] = payload.values
  },
  SET_DEFAULT_COLS: (state) => {
    Object.assign(state, defaultState())
  },
}
