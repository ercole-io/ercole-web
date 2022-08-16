import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import * as config from '@/store/modules/config'
import * as loading from '@/store/modules/loading'
import * as errors from '@/store/modules/errors'
// Login
import * as auth from '@/store/modules/login/auth'
// dashboard
import * as dashboard from '@/store/modules/dashboard/dashboard'
import * as technologies from '@/store/modules/technologies'
// Hosts
import * as hosts from '@/store/modules/hosts/hosts'
import * as hostnames from '@/store/modules/hostnames'
import * as hostDetails from '@/store/modules/hosts/hostDetails'
// Alerts
import * as alerts from '@/store/modules/alerts/alerts'
// Licenses
import * as licensesUsed from '@/store/modules/licenses/licenses-used'
import * as licensesContracts from '@/store/modules/licenses/licenses-contracts'
import * as licensesCompliance from '@/store/modules/licenses/licenses-compliance'
// Clusters
import * as clusters from '@/store/modules/hypervisors/clusters'
import * as clusternames from '@/store/modules/clusternames'
// Databases
import * as databases from '@/store/modules/databases/databases'
// Databases Oracle
import * as oracle from '@/store/modules/databases/oracle/oracle'
import * as oracleSegmentAdvisor from '@/store/modules/databases/oracle/oracle-segment-advisor'
import * as oraclePatchAdvisor from '@/store/modules/databases/oracle/oracle-patch-advisor'
import * as oracleAddm from '@/store/modules/databases/oracle/oracle-addm'
import * as oraclePatch from '@/store/modules/databases/oracle/oracle-patch'
import * as oracleOptions from '@/store/modules/databases/oracle/options'
// Databases Mysql
import * as mysql from '@/store/modules/databases/mysql/mysql'
// Databases Microsoft
import * as microsoft from '@/store/modules/databases/microsoft/microsoft'
// Databases Postgree
import * as postgresql from '@/store/modules/databases/postgresql/postgresql'
import * as globalFilters from '@/store/modules/global-filters'
import * as localFilters from '@/store/modules/local-filters'
import * as engineeredSystems from '@/store/modules/engineered-systems/engineered-systems'
import * as LicensesTypes from '@/store/modules/licenses-types'
import * as rangeDates from '@/store/modules/range-dates'
import * as moreInfoToggle from '@/store/modules/more-info-toggle'
import * as columnToggle from '@/store/modules/columns-toggle'
import * as repository from '@/store/modules/repository/repository'
import * as ignoreLicense from '@/store/modules/ignoreLicense'
import * as microsoftContracts from '@/store/modules/licenses/contracts/microsoft'
import * as mysqlContracts from '@/store/modules/licenses/contracts/mysql'
import * as oracleContracts from '@/store/modules/licenses/contracts/oracle'
import * as oracleDbGrants from '@/store/modules/databases/oracle/oracle-db-grants'
// Cloud
import * as cloudTechnology from '@/store/modules/cloud/cloudTechnology'
import * as cloudProfileConfig from '@/store/modules/cloud/profileConfig'
import * as cloudRecommendations from '@/store/modules/cloud/recommendations'
import * as cloudActiveProfiles from '@/store/modules/cloud/activeProfiles'
//Database Connection
import * as dbConnection from '@/store/modules/dbConnection'
// Version
import * as version from '@/store/modules/version'

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
    oraclePatch,
    oracleOptions,
    mysql,
    microsoft,
    postgresql,
    globalFilters,
    localFilters,
    engineeredSystems,
    LicensesTypes,
    rangeDates,
    moreInfoToggle,
    columnToggle,
    cloudTechnology,
    cloudProfileConfig,
    cloudRecommendations,
    cloudActiveProfiles,
    repository,
    ignoreLicense,
    microsoftContracts,
    mysqlContracts,
    oracleContracts,
    oracleDbGrants,
    dbConnection,
    version,
  },
  plugins: [
    createPersistedState({
      key: 'persisted-data',
      paths: [
        'auth',
        'technologies',
        'globalFilters',
        'moreInfoToggle',
        'columnToggle',
        'cloudActiveProfiles.ociActiveProfile',
        'cloudActiveProfiles.awsActiveProfile',
      ],
    }),
  ],
})
