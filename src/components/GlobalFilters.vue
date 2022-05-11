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
          :label="$t('common.globalFilters.location')"
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
            :placeholder="`${$t('common.forms.select')} ${$t(
              'common.globalFilters.locationPH'
            )}`"
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
          v-show="$route.name !== 'alerts'"
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
            :disabled="!disableButtons"
          >
            {{ $t('common.forms.apply') }}
          </b-button>

          <b-button
            @click="resetFilters"
            class="filters-button"
            size="is-small"
            type="is-danger"
            :disabled="!disableButtons"
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
  mixins: [tooltipMixin],
  data() {
    return {
      isFiltersOpened: false,
      filterIcon: 'chevron-down',
      glFilters: {},
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
      'getLicensesDatabases',
      'getEngineeredSystems',
      'getMysqlDbs',
      'getComplianceList',
      'getLicensesHosts',
      'getLicensesClusters',
      'getMsSqlServerDbs',
    ]),
    ...mapMutations(['SET_OPEN_FILTERS']),
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
      this.$store.commit('SET_ACTIVE_FILTERS', {
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
          this.getHostByName(params.hostname)
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
          this.getEngineeredSystems().then(() => this.offLoadingTable())
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
    disableButtons() {
      if (
        this.glFilters.location ||
        this.glFilters.environment ||
        this.glFilters.date
      ) {
        return true
      } else {
        return false
      }
    },
    notShowing() {
      return (
        this.$route.name !== 'licenses-contract' &&
        this.$route.name !== 'dashboard' &&
        this.$route.name !== 'repository' &&
        this.$route.name !== 'cloud-recommendations' &&
        this.$route.name !== 'profile-configurations' &&
        this.$route.name !== 'ercole-recommendations' &&
        this.$route.name !== 'alerts'
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