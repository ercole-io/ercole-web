import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import * as config from './modules/config'
import * as loading from './modules/loading'
import * as errors from './modules/errors'
import * as auth from './modules/auth'
import * as dashboard from './modules/dashboard/dashboard'
import * as hosts from './modules/hosts/hosts'
import * as hostnames from './modules/hostnames'
import * as hostDetails from './modules/hosts/hostDetails'
import * as alerts from './modules/alerts/alerts'
import * as licensesUsed from './modules/licenses/licenses-used'
import * as licensesContracts from './modules/licenses/licenses-contracts'
import * as licensesCompliance from './modules/licenses/licenses-compliance'
import * as clusters from './modules/hypervisors/clusters'
import * as clusternames from './modules/clusternames.js'
import * as technologies from './modules/technologies'
import * as databases from './modules/databases/databases'
import * as oracle from './modules/databases/oracle/oracle'
import * as oracleSegmentAdvisor from './modules/databases/oracle/oracle-segment-advisor'
import * as oraclePatchAdvisor from './modules/databases/oracle/oracle-patch-advisor'
import * as oracleAddm from './modules/databases/oracle/oracle-addm'
import * as mysql from './modules/databases/mysql/mysql'
import * as microsoft from './modules/databases/microsoft/microsoft.js'
import * as globalFilters from './modules/global-filters'
import * as localFilters from './modules/local-filters'
import * as engineeredSystems from './modules/engineered-systems/engineered-systems'
import * as LicensesTypes from './modules/licenses-types'
import * as rangeDates from './modules/range-dates'
import * as moreInfoToggle from '@/store/modules/more-info-toggle.js'
import * as columnToggle from '@/store/modules/columns-toggle.js'
import * as profileConfig from '@/store/modules/cloud/profileConfig.js'
import * as ercoleRecommendations from '@/store/modules/cloud/ercoleRecommendations.js'
import * as activeProfiles from '@/store/modules/cloud/activeProfiles.js'
import * as repository from '@/store/modules/repository/repository.js'
import * as ignoreLicense from '@/store/modules/ignoreLicense.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    config,
    loading,
    errors,
    auth,
    dashboard,
    hosts,
    hostnames,
    hostDetails,
    alerts,
    licensesUsed,
    licensesContracts,
    licensesCompliance,
    clusters,
    clusternames,
    technologies,
    databases,
    oracle,
    oracleSegmentAdvisor,
    oraclePatchAdvisor,
    oracleAddm,
    mysql,
    microsoft,
    globalFilters,
    localFilters,
    engineeredSystems,
    LicensesTypes,
    rangeDates,
    moreInfoToggle,
    columnToggle,
    profileConfig,
    ercoleRecommendations,
    activeProfiles,
    repository,
    ignoreLicense,
  },
  plugins: [
    createPersistedState({
      key: 'persisted-data',
      paths: [
        'auth',
        'technologies',
        'hostnames',
        'globalFilters',
        'clusternames',
        'moreInfoToggle',
        'columnToggle',
        'activeProfiles',
      ],
    }),
  ],
})
