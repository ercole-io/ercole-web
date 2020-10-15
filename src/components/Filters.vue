<template>
  <section class="filters">
    <b-button
      @click="expandFilters"
      size="is-small"
      type="is-light"
      pack="fas"
      :icon-right="filterIcon"
      class="bt-show-hide-filters"
      :class="filtersTextClass"
      expanded
    >
      {{ isFiltersOpened ? 'Hide Global Filters' : 'Show Global Filters' }}
    </b-button>

    <b-collapse animation="slide" :open.sync="isFiltersOpened">
      <div class="filters-form">
        <b-field
          label="Location"
          class="filters-field"
          custom-class="is-size-7"
          horizontal
          v-show="
            $route.name !== 'hosts-details' && $route.name !== 'cluster-details'
          "
        >
          <b-select
            v-model="filters.location"
            size="is-small"
            placeholder="Select an location"
            expanded
          >
            <option :value="null" v-if="filters.location">
              Reset location
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
          label="Environment"
          class="filters-field"
          custom-class="is-size-7"
          horizontal
          v-show="
            $route.name !== 'hosts-details' && $route.name !== 'cluster-details'
          "
        >
          <b-select
            v-model="filters.environment"
            size="is-small"
            placeholder="Select an environment"
            expanded
          >
            <option :value="null" v-if="filters.environment">
              Reset environment
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
          label="Date"
          class="filters-field"
          custom-class="is-size-7"
          horizontal
          v-show="$route.name !== 'alerts'"
          style="max-width: 400px"
        >
          <b-datepicker
            v-model="filters.date"
            :date-formatter="formatDate"
            size="is-small"
            placeholder="Select a date"
            icon="calendar-today"
            trap-focus
            expanded
            editable
            :max-date="new Date()"
          >
          </b-datepicker>
        </b-field>

        <b-button
          @click="applyFilters"
          class="filters-button"
          size="is-small"
          type="is-primary"
        >
          Apply
        </b-button>

        <b-button
          @click="resetFilters"
          class="filters-button"
          size="is-small"
          type="is-danger"
        >
          Reset
        </b-button>
      </div>
    </b-collapse>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import formatDate from '@/filters/formatDate.js'
import { formatDatepickerDate } from '@/helpers/helpers.js'

const getGlobalFilters = JSON.parse(localStorage.getItem('globalFilters'))

export default {
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
      isFiltered: false,
      filtersTextClass: '',
      filterIcon: 'chevron-down',
      filters: {
        location: getGlobalFilters.location,
        environment: getGlobalFilters.environment,
        date: formatDatepickerDate(getGlobalFilters.date)
      }
    }
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
      'getLicensesList'
    ]),
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
        this.$emit('filters', this.isFiltersOpened)
      } else {
        this.filterIcon = 'chevron-down'
        this.$emit('filters', this.isFiltersOpened)
      }
    },
    applyFilters() {
      this.filters.date = formatDatepickerDate(this.filters.date)
      localStorage.setItem('globalFilters', JSON.stringify(this.filters))
      this.reloadPage(this.$route.name)
      this.isFiltered = true
    },
    resetFilters() {
      this.filters = {
        location: null,
        environment: null,
        date: formatDatepickerDate()
      }
      localStorage.setItem('globalFilters', JSON.stringify(this.filters))
      this.reloadPage(this.$route.name)
      this.isFiltered = false
      this.filtersTextClass = ''
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
          this.getAlertsData()
          break
        case 'licenses-used':
          this.getLicensesList()
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
    ...mapState(['globalFilters'])
  },
  watch: {
    isFiltered(value) {
      if (value) {
        if (
          this.filters.date ||
          this.filters.environment ||
          this.filters.location
        ) {
          this.filtersTextClass = 'has-text-success'
        }
      }
    }
  }
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
    }
  }

  .bt-show-hide-filters {
    font-size: 11px;
    font-weight: 500;
  }

  @media screen and (max-width: 960px) {
    .filters-form {
      flex-direction: column;

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
