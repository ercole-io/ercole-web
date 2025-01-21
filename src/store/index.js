import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

// General
import * as config from '@/store/modules/common/config'
import * as config_sso from '@/store/modules/common/config_sso'
import * as loading from '@/store/modules/common/loading'
import * as errors from '@/store/modules/common/errors'
import * as tableInterations from '@/store/modules/common/table-interations'

import * as columnToggle from '@/store/modules/common/columns-toggle'
import * as moreInfoToggle from '@/store/modules/common/more-info-toggle'

import * as dbConnection from '@/store/modules/common/dbConnection'
import * as version from '@/store/modules/common/version'

import * as globalFilters from '@/store/modules/common/global-filters'
import * as localFilters from '@/store/modules/common/local-filters'

import * as clusternames from '@/store/modules/common/clusternames'
import * as hostnames from '@/store/modules/common/hostnames'
import * as technologies from '@/store/modules/common/technologies'
import * as LicensesTypes from '@/store/modules/common/licenses-types'

import * as ignoreLicense from '@/store/modules/common/ignoreLicense'
import * as rangeDates from '@/store/modules/common/range-dates'

// Login
import * as auth from '@/store/modules/login/auth'
// Menu
import * as menu from '@/store/modules/menu/menu'
// dashboard
import * as dashboard from '@/store/modules/dashboard/dashboard'
// Hosts
import * as hosts from '@/store/modules/hosts/hosts'
import * as hostDetails from '@/store/modules/hosts/hostDetails'
// Alerts
import * as alerts from '@/store/modules/alerts/alerts'
// Licenses
import * as licensesUsed from '@/store/modules/licenses/licenses-used'
import * as licensesContracts from '@/store/modules/licenses/licenses-contracts'
import * as licensesCompliance from '@/store/modules/licenses/licenses-compliance'
// Clusters
import * as clusters from '@/store/modules/hypervisors/clusters'
// Databases
import * as databases from '@/store/modules/databases/databases'
// Databases Oracle
import * as oracle from '@/store/modules/databases/oracle/oracle'
import * as oracleSegmentAdvisor from '@/store/modules/databases/oracle/oracle-segment-advisor'
import * as oraclePatchAdvisor from '@/store/modules/databases/oracle/oracle-patch-advisor'
import * as oracleAddm from '@/store/modules/databases/oracle/oracle-addm'
import * as oraclePatch from '@/store/modules/databases/oracle/oracle-patch'
import * as oracleOptions from '@/store/modules/databases/oracle/options'
import * as oracleTablespaces from '@/store/modules/databases/oracle/tablespaces'
import * as oracleBackups from '@/store/modules/databases/oracle/backups'
import * as oracleServices from '@/store/modules/databases/oracle/services'
import * as oracleDbgrowth from '@/store/modules/databases/oracle/dbgrowth'
import * as orcaleSchemas from '@/store/modules/databases/oracle/schemas'
import * as oraclePdbs from '@/store/modules/databases/oracle/pdbs'
import * as oracleCpuTime from '@/store/modules/databases/oracle/cpuTime'
import * as oraclePartitionings from '@/store/modules/databases/oracle/partitionings'
import * as oracleCapacity from '@/store/modules/databases/oracle/capacity'
import * as oraclePolicyAudit from '@/store/modules/databases/oracle/policyAudit'
import * as oraclePsqlMigrabilkity from '@/store/modules/databases/oracle/psqlMigrability'
import * as oracleAwsRds from '@/store/modules/databases/oracle/aws-rds'
// Databases Mysql
import * as mysql from '@/store/modules/databases/mysql/mysql'
// Databases Microsoft
import * as microsoft from '@/store/modules/databases/microsoft/microsoft'
// Databases Postgree
import * as postgresql from '@/store/modules/databases/postgresql/postgresql'
// Databases MongoDB
import * as mongodb from '@/store/modules/databases/mongodb/mongodb'
// Exadata
import * as exadata from '@/store/modules/exadata/exadata'
import * as exadataPA from '@/store/modules/exadata/patch-advisors'
// Repository
import * as repository from '@/store/modules/repository/repository'
// LIcenses Contracts
import * as microsoftContracts from '@/store/modules/licenses/contracts/microsoft'
import * as mysqlContracts from '@/store/modules/licenses/contracts/mysql'
import * as oracleContracts from '@/store/modules/licenses/contracts/oracle'
import * as oracleDbGrants from '@/store/modules/databases/oracle/oracle-db-grants'
// Cloud
import * as cloudTechnology from '@/store/modules/cloud/cloudTechnology'
import * as cloudProfileConfig from '@/store/modules/cloud/profileConfig'
import * as cloudRecommendations from '@/store/modules/cloud/recommendations'
import * as cloudActiveProfiles from '@/store/modules/cloud/activeProfiles'
import * as cloudAllRecommendations from '@/store/modules/cloud/allRecommendations'
// Settings
import * as settings from '@/store/modules/settings/settings'
// Troubleshooting page
import * as troubleshooting from '@/store/modules/troubleshooting/troubleshooting'
// Profile Management
import * as users from '@/store/modules/profile/users'
import * as groups from '@/store/modules/profile/groups'
import * as roles from '@/store/modules/profile/roles'
import * as nodes from '@/store/modules/profile/nodes'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    config,
    config_sso,
    loading,
    errors,
    tableInterations,
    auth,
    menu,
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
    oracleTablespaces,
    oracleBackups,
    oracleServices,
    oracleDbgrowth,
    orcaleSchemas,
    oraclePdbs,
    oracleCpuTime,
    oraclePartitionings,
    oracleCapacity,
    oraclePolicyAudit,
    oraclePsqlMigrabilkity,
    oracleAwsRds,
    mysql,
    microsoft,
    postgresql,
    mongodb,
    globalFilters,
    localFilters,
    exadata,
    exadataPA,
    LicensesTypes,
    rangeDates,
    moreInfoToggle,
    columnToggle,
    cloudTechnology,
    cloudProfileConfig,
    cloudRecommendations,
    cloudActiveProfiles,
    cloudAllRecommendations,
    repository,
    ignoreLicense,
    microsoftContracts,
    mysqlContracts,
    oracleContracts,
    oracleDbGrants,
    dbConnection,
    version,
    users,
    groups,
    roles,
    nodes,
    settings,
    troubleshooting,
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
        'menu',
        'settings',
      ],
    }),
  ],
})
