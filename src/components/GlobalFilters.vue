<template>
  <section class="filters" v-if="notShowing">
    <b-button
      v-tooltip.bottom="
        options(
          globalFilters.hasActiveFilters
            ? $t('common.globalFilters.active')
            : $t('common.globalFilters.inactive')
        )
      "
      @click="expandFilters"
      size="is-small"
      type="is-light"
      pack="fas"
      :icon-right="filterIcon"
      class="bt-show-hide-filters"
      expanded
    >
      <b-icon
        :type="{ 'is-primary': globalFilters.hasActiveFilters }"
        icon="filter"
        size="is-small"
        pack="fas"
        style="margin: -2px 0 0 0"
      />
      {{
        isFiltersOpened
          ? $t('common.globalFilters.hide')
          : $t('common.globalFilters.show')
      }}
    </b-button>

    <div class="activeFilters" v-if="globalFilters.hasActiveFilters">
      <div class="has-text-weight-medium is-flex">
        {{ $t('common.globalFilters.activeFilters') }}
        <div class="field ml-2" v-if="glFilters.location">
          <b-tag type="is-warning is-light">
            {{ glFilters.location }}
          </b-tag>
        </div>
        <div class="field ml-2" v-if="glFilters.environment">
          <b-tag type="is-warning is-light">
            {{ glFilters.environment }}
          </b-tag>
        </div>
        <div class="field ml-2" v-if="glFilters.date">
          <b-tag type="is-warning is-light">
            {{ formatDate(glFilters.date) }}
          </b-tag>
        </div>
      </div>
    </div>

    <b-collapse animation="slide" :open.sync="isFiltersOpened">
      <div class="filters-form">
        <b-field
          :label="
            locationAlias ? locationAlias : $t('common.globalFilters.location')
          "
          class="filters-field"
          custom-class="is-size-7"
          horizontal
          v-show="
            $route.name !== 'hosts-details' && $route.name !== 'cluster-details'
          "
        >
          <b-select
            v-model="glFilters.location"
            size="is-small"
            :placeholder="`${$t('common.forms.select')} ${
              locationAlias
                ? locationAlias
                : $t('common.globalFilters.locationPH')
            }`"
            expanded
          >
            <option :value="null" v-if="glFilters.location">
              {{ $t('common.forms.reset') }}
              {{ $t('common.globalFilters.location') }}
            </option>
            <option
              v-for="(loc, index) in globalFilters.locations"
              :key="index"
            >
              {{ loc }}
            </option>
          </b-select>
        </b-field>

        <b-field
          :label="$t('common.globalFilters.environment')"
          class="filters-field"
          custom-class="is-size-7"
          horizontal
          v-show="
            $route.name !== 'hosts-details' && $route.name !== 'cluster-details'
          "
        >
          <b-select
            v-model="glFilters.environment"
            size="is-small"
            :placeholder="`${$t('common.forms.select')} ${$t(
              'common.globalFilters.environmentPH'
            )}`"
            expanded
          >
            <option :value="null" v-if="glFilters.environment">
              {{ $t('common.forms.reset') }}
              {{ $t('common.globalFilters.environment') }}
            </option>
            <option
              v-for="(env, index) in globalFilters.environments"
              :key="index"
            >
              {{ env }}
            </option>
          </b-select>
        </b-field>

        <b-field
          :label="$t('common.globalFilters.date')"
          class="filters-field"
          custom-class="is-size-7"
          horizontal
        >
          <b-datepicker
            v-model="glFilters.date"
            :date-formatter="formatDate"
            size="is-small"
            :placeholder="`${$t('common.forms.select')} ${$t(
              'common.globalFilters.date'
            )}`"
            icon="calendar-today"
            trap-focus
            expanded
            editable
            :max-date="new Date()"
          />
        </b-field>

        <div class="filter-buttons">
          <b-button
            @click="applyFilters"
            class="filters-button"
            size="is-small"
            type="is-custom-primary"
          >
            {{ $t('common.forms.apply') }}
          </b-button>

          <b-button
            @click="resetFilters"
            class="filters-button"
            size="is-small"
            type="is-danger"
          >
            {{ $t('common.forms.reset') }}
          </b-button>
        </div>
      </div>
    </b-collapse>
  </section>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
import { formatDatepickerDate } from '@/helpers/helpers.js'
import formatDate from '@/filters/formatDate.js'
import tooltipMixin from '@/mixins/tooltipMixin.js'

export default {
  name: 'globalfilters-component',
  mixins: [tooltipMixin],
  data() {
    return {
      isFiltersOpened: false,
      filterIcon: 'chevron-down',
      glFilters: {},
      locationAlias: JSON.parse(localStorage.getItem('persisted-data')).settings
        .allSettings.APIService.LocationAlias,
    }
  },
  beforeMount() {
    this.glFilters = {
      location: this.getActiveFilters.location,
      environment: this.getActiveFilters.environment,
      date: this.getActiveFilters.date
        ? new Date(this.getActiveFilters.date)
        : null,
    }
    this.isFiltersOpened = this.globalFilters.isFilterOpened
  },
  methods: {
    ...mapActions([
      'onLoadingTable',
      'offLoadingTable',
      'getHosts',
      'getHostByName',
      'getDatabases',
      'getOracleDbs',
      'getAddms',
      'getSegmentAdvisor',
      'getPatchAdvisor',
      'getClusters',
      'getClusterByName',
      'getExadataData',
      'getMysqlDbs',
      'getComplianceList',
      'getMsSqlServerDbs',
      'getPostgreSqlDbs',
      'getMongoDbDbs',
      'getLicensesHosts',
      'getLicensesClusters',
      'getLicensesDatabases',
      'getAlertsData',
      'getDbGrants',
      'getPatch',
      'getOptions',
      'getTablespaces',
      'getBackups',
      'getServices',
      'getDbgrowth',
      'getSchemas',
      'getPdbs',
      'getOracleHosts',
      'getPartitionings',
    ]),
    ...mapMutations(['SET_OPEN_FILTERS', 'SET_ACTIVE_FILTERS']),
    expandFilters() {
      this.isFiltersOpened = !this.isFiltersOpened
      if (this.isFiltersOpened) {
        this.filterIcon = 'chevron-up'
      } else {
        this.filterIcon = 'chevron-down'
      }
      this.SET_OPEN_FILTERS(this.isFiltersOpened)
    },
    applyFilters() {
      this.glFilters.date = this.glFilters.date
        ? new Date(formatDatepickerDate(this.glFilters.date))
        : null
      this.$store.commit('SET_ACTIVE_FILTERS', {
        active: this.glFilters,
        status: true,
      })

      this.reloadPage(this.$route.name)
    },
    resetFilters() {
      this.glFilters = {
        location: null,
        environment: null,
        date: null,
      }
      this.SET_ACTIVE_FILTERS({
        active: this.glFilters,
        status: false,
      })
      this.reloadPage(this.$route.name)
    },
    reloadPage(name) {
      const params = this.$route.params
      this.onLoadingTable()

      switch (name) {
        case 'hosts':
          this.getHosts()
            .then(() => this.offLoadingTable())
            .catch((err) => {
              if (err) {
                this.resetFilters()
              }
            })
          break
        case 'hosts-details':
          this.getHostByName({ hostname: params.hostname, loading: true })
          break
        case 'databases':
          this.getDatabases().then(() => this.offLoadingTable())
          break
        case 'oracle':
          this.getOracleDbs().then(() => this.offLoadingTable())
          break
        case 'addm':
          this.getAddms().then(() => this.offLoadingTable())
          break
        case 'segment-advisor':
          this.getSegmentAdvisor().then(() => this.offLoadingTable())
          break
        case 'patch-advisor':
          this.getPatchAdvisor().then(() => this.offLoadingTable())
          break
        case 'hypervisors':
          this.getClusters().then(() => this.offLoadingTable())
          break
        case 'cluster-details':
          this.getClusterByName(params.clustername).then(() =>
            this.offLoadingTable()
          )
          break
        case 'licenses-used':
          this.getLicensesDatabases().then(() => this.offLoadingTable())
          this.getLicensesHosts().then(() => this.offLoadingTable())
          this.getLicensesClusters().then(() => this.offLoadingTable())
          break
        case 'engineered-systems':
          this.getExadataData().then(() => this.offLoadingTable())
          break
        case 'mysql':
          this.getMysqlDbs().then(() => this.offLoadingTable())
          break
        case 'licenses-compliance':
          this.getComplianceList().then(() => this.offLoadingTable())
          break
        case 'microsoft':
          this.getMsSqlServerDbs().then(() => this.offLoadingTable())
          break
        case 'postgresql':
          this.getPostgreSqlDbs().then(() => this.offLoadingTable())
          break
        case 'mongodb':
          this.getMongoDbDbs().then(() => this.offLoadingTable())
          break
        case 'alerts':
          this.getAlertsData().then(() => this.offLoadingTable())
          break
        case 'dba-role':
          this.getDbGrants().then(() => this.offLoadingTable())
          break
        case 'patch':
          this.getPatch().then(() => this.offLoadingTable())
          break
        case 'options':
          this.getOptions().then(() => this.offLoadingTable())
          break
        case 'tablespaces':
          this.getTablespaces().then(() => this.offLoadingTable())
          break
        case 'backups':
          this.getBackups().then(() => this.offLoadingTable())
          break
        case 'services':
          this.getServices().then(() => this.offLoadingTable())
          break
        case 'dbgrowth':
          this.getDbgrowth().then(() => this.offLoadingTable())
          break
        case 'schemas':
          this.getSchemas().then(() => this.offLoadingTable())
          break
        case 'pdbs':
          this.getPdbs().then(() => this.offLoadingTable())
          break
        case 'cpu-time':
          this.getOracleHosts().then(() => this.offLoadingTable())
          break
        case 'partitionings':
          this.getPartitionings().then(() => this.offLoadingTable())
          break
        default:
          return
      }
    },
    formatDate(date) {
      return formatDate(date)
    },
  },
  computed: {
    ...mapState(['globalFilters']),
    ...mapGetters(['getActiveFilters']),
    notShowing() {
      return (
        this.$route.name !== 'dashboard' &&
        this.$route.name !== 'licenses-contract' &&
        this.$route.name !== 'licenses-contracts-oracle' &&
        this.$route.name !== 'licenses-contracts-mysql' &&
        this.$route.name !== 'licenses-contracts-sqlserver' &&
        this.$route.name !== 'licenses-contracts-postgresql' &&
        this.$route.name !== 'licenses-contracts-mongodb' &&
        this.$route.name !== 'repository' &&
        this.$route.name !== 'oracle-profile-configurations' &&
        this.$route.name !== 'oracle-recommendations' &&
        this.$route.name !== 'aws-profile-configurations' &&
        this.$route.name !== 'aws-recommendations' &&
        this.$route.name !== 'azure-profile-configurations' &&
        this.$route.name !== 'users' &&
        this.$route.name !== 'groups' &&
        this.$route.name !== 'roles' &&
        this.$route.name !== 'settings' &&
        this.$route.name !== 'capacity' &&
        this.$route.name !== 'capacityos' &&
        this.$route.name !== 'exadata' &&
        this.$route.name !== 'troubleshooting' &&
        this.$route.name !== 'awsrds' &&
        this.$route.name !== 'google-profile-configurations' &&
        this.$route.name !== 'google-recommendations' &&
        this.$route.name !== 'policyaudit' &&
        this.$route.name !== 'allRecommendations' &&
        this.$route.name !== 'exadataPA'
      )
    },
  },
}
</script>

<style lang="scss" scoped>
.filters {
  position: relative;
  width: 100%;
  z-index: 50;
  border-bottom: 1px solid #ccc;

  .filters-form {
    display: flex;
    justify-content: flex-end;
    flex-direction: row;
    padding: 10px 20px;
    background-color: #dbdbdb;
    min-height: 48px;

    .filters-field {
      width: 100%;
      max-width: 500px;
    }

    .filter-buttons {
      display: flex;
      flex-direction: row;
    }
  }

  .bt-show-hide-filters {
    font-size: 11px;
    font-weight: 500;
  }

  .activeFilters {
    position: absolute;
    top: 0;
    left: 10px;
    font-size: 11px;
    line-height: 24px;

    .field {
      .tag {
        font-size: 11px;
      }
    }
  }

  @media screen and (max-width: 960px) {
    .filters-form {
      flex-direction: column;
      align-items: center;

      .filters-field {
        margin-bottom: 1rem;
      }
    }
  }

  @media screen and (min-width: 960px) {
    .filters-field {
      margin-bottom: 0;
      margin-left: 1rem;
    }

    .filters-button {
      margin-left: 20px;
    }
  }
}
</style>
