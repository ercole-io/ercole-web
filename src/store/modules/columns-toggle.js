const defaultState = () => ({
  'page-microsoftContracts': [false, true],
  'page-mysqlContracts': [false, true],
  'page-oracleContracts': [false, true],
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
  'page-dbGrants': [false, true],
  'page-databasesMysql': [false, true],
  'page-hosts': [false, true],
  'page-repository': [false, true],
  'page-profileConfigOracle': [false, true],
  'page-profileConfigAws': [false, true],
  'page-recommendationsOracle': [false, true],
  'page-recommendationsAws': [false, true],
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
