<template>
  <section
    class="filters"
    v-if="
      $route.name !== 'licenses-agreement' &&
        $route.name !== 'dashboard' &&
        $route.name !== 'licenses-compliance'
    "
  >
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
            :placeholder="
              `${$t('common.forms.select')} ${$t(
                'common.globalFilters.locationPH'
              )}`
            "
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
            :placeholder="
              `${$t('common.forms.select')} ${$t(
                'common.globalFilters.environmentPH'
              )}`
            "
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

        <!-- <b-field
          label="Taglist"
          class="filters-field"
          custom-class="is-size-7"
          horizontal
        >
          <b-taginput
            size="is-small"
            v-model="tags"
            :data="filteredTags"
            autocomplete
            ref="taginput"
            icon="label"
            placeholder="Add a tag"
            @typing="getFilteredTags"
            expanded
          >
            <template slot-scope="props">
              <strong>{{ props.option.id }}</strong
              >: {{ props.option.name }}
            </template>
            <template slot="empty">
              There are no items
            </template>
            <template slot="selected" slot-scope="props">
              <b-tag
                v-for="(tag, index) in props.tags"
                :key="index"
                type="is-primary"
                :tabstop="false"
                closable
                @close="$refs.taginput.removeTag(index, $event)"
              >
                {{ tag.name }}
              </b-tag>
            </template>
          </b-taginput>
        </b-field> -->

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
            :placeholder="
              `${$t('common.forms.select')} ${$t(
                'common.globalFilters.environmentPH'
              )}`
            "
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
            type="is-primary"
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
import formatDate from '@/filters/formatDate.js'
import { formatDatepickerDate } from '@/helpers/helpers.js'
import tooltipMixin from '@/mixins/tooltipMixin.js'
import { bus } from '@/helpers/eventBus.js'

export default {
  mixins: [tooltipMixin],
  data() {
    return {
      // tagList: [
      //   { id: 'a', name: 'Tag 1' },
      //   { id: 'b', name: 'Tag 2' },
      //   { id: 'c', name: 'Tag 3' },
      //   { id: 'd', name: 'Tag 4' },
      //   { id: 'e', name: 'Tag 5' }
      // ],
      // filteredTags: this.tagList,
      // tags: [],
      isFiltersOpened: false,
      filterIcon: 'chevron-down',
      glFilters: {},
      alertStatus: 'NEW'
    }
  },
  beforeMount() {
    this.glFilters = {
      location: this.getActiveFilters.location,
      environment: this.getActiveFilters.environment,
      date: this.getActiveFilters.date
        ? new Date(this.getActiveFilters.date)
        : null
    }
    this.isFiltersOpened = this.globalFilters.isFilterOpened

    bus.$on('alertStatus', val => {
      this.alertStatus = val
    })

    // bus.$on('openFilters', () => {
    //   this.isFiltersOpened = false
    // })
  },
  methods: {
    ...mapActions([
      'getHosts',
      'getHostByName',
      'getDatabases',
      'getOracleDbs',
      'getAddms',
      'getSegmentAdvisor',
      'getPatchAdvisor',
      'getClusters',
      'getClusterByName',
      'getAlertsData',
      'getLicensesList',
      'getEngineeredSystems'
    ]),
    ...mapMutations(['SET_OPEN_FILTERS']),
    // getFilteredTags(text) {
    //   this.filteredTags = this.tagList.filter(option => {
    //     return (
    //       option.name
    //         .toString()
    //         .toLowerCase()
    //         .indexOf(text.toLowerCase()) >= 0
    //     )
    //   })
    // },
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
        status: true
      })
      this.reloadPage(this.$route.name)
    },
    resetFilters() {
      this.glFilters = {
        location: null,
        environment: null,
        date: null
      }
      this.$store.commit('SET_ACTIVE_FILTERS', {
        active: this.glFilters,
        status: false
      })
      this.reloadPage(this.$route.name)
    },
    reloadPage(name) {
      const params = this.$route.params

      switch (name) {
        case 'hosts':
          this.getHosts()
          break
        case 'hosts-details':
          this.getHostByName(params.hostname)
          break
        case 'databases':
          this.getDatabases()
          break
        case 'oracle':
          this.getOracleDbs()
          break
        case 'addm':
          this.getAddms()
          break
        case 'segment-advisor':
          this.getSegmentAdvisor()
          break
        case 'patch-advisor':
          this.getPatchAdvisor()
          break
        case 'hypervisors':
          this.getClusters()
          break
        case 'cluster-details':
          this.getClusterByName(params.clustername)
          break
        case 'alerts':
          this.getAlertsData({ status: this.alertStatus })
          break
        case 'licenses-used':
          this.getLicensesList()
          break
        case 'engineered-systems':
          this.getEngineeredSystems()
          break
        default:
          return
      }
    },
    formatDate(date) {
      return formatDate(date)
    }
  },
  computed: {
    ...mapState(['globalFilters']),
    ...mapGetters(['getActiveFilters'])
  }
  // watch: {
  //   isFiltersOpened(value) {
  //     if (value) {
  //       bus.$emit('isGlobalFilterOpened', true)
  //     } else {
  //       bus.$emit('isGlobalFilterOpened', false)
  //     }
  //   }
  // }
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
