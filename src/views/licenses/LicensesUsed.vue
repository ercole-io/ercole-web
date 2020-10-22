<template>
  <section>
    <DrawerRight>
      <BoxContent
        slot="drawer-content"
        title="Licenses Used Filters"
        class="mt-5"
      >
        <form @submit.prevent="applyFilters">
          <b-field label="Hostname" custom-class="is-small">
            <b-autocomplete
              v-model="licensesUsedFilters.hostname"
              size="is-small"
              type="number"
              clearable
              :data="filteredhostname"
              @typing="setFilteredAutocomplete($event, 'hostname')"
            >
              <template slot="empty">No results found</template>
            </b-autocomplete>
          </b-field>

          <b-field label="DB Name" custom-class="is-small">
            <b-autocomplete
              v-model="licensesUsedFilters.dbName"
              size="is-small"
              type="number"
              clearable
              :data="filtereddbName"
              @typing="setFilteredAutocomplete($event, 'dbName')"
            >
              <template slot="empty">No results found</template>
            </b-autocomplete>
          </b-field>

          <b-field label="License Name" custom-class="is-small">
            <b-autocomplete
              v-model="licensesUsedFilters.licenseName"
              size="is-small"
              type="number"
              clearable
              :data="filteredlicenseName"
              @typing="setFilteredAutocomplete($event, 'licenseName')"
            >
              <template slot="empty">No results found</template>
            </b-autocomplete>
          </b-field>

          <b-field label="Used Licenses" custom-class="is-small">
            <b-slider
              v-model="licensesUsedFilters.usedLicenses"
              :min="minusedLicenses"
              :max="maxusedLicenses"
              :step="0.5"
            >
              <template v-for="val in filteredusedLicenses">
                <b-slider-tick :value="val" :key="val">{{ val }}</b-slider-tick>
              </template>
            </b-slider>
          </b-field>

          <div
            class="buttons is-flex mt-5"
            style="justify-content: space-between;"
          >
            <b-button type="is-danger" size="is-small" @click="resetFilters">
              Reset
            </b-button>
            <b-button type="is-primary" size="is-small" native-type="submit">
              Apply
            </b-button>
          </div>
        </form>
      </BoxContent>
    </DrawerRight>
    <BoxContent>
      <FullTable
        placeholder="Search on Licenses"
        :keys="keys"
        :tableData="getUsedLicenses"
        :clickedRow="() => []"
      >
        <DrawerButton slot="customTopHeader" tooltipText="More Filters" />

        <template slot="headData">
          <v-th sortKey="hostname">Hostname</v-th>
          <v-th sortKey="dbName">DB Name</v-th>
          <v-th sortKey="licenseName">License Name</v-th>
          <v-th sortKey="usedLicenses">Used Licenses</v-th>
        </template>

        <template slot="bodyData" slot-scope="rowData">
          <HostLink :hostname="rowData.scope.hostname" />
          <TdContent :value="rowData.scope.dbName" />
          <TdContent :value="rowData.scope.licenseName" />
          <TdContent :value="rowData.scope.usedLicenses" />
        </template>

        <exportButton
          slot="export"
          url="licenses?mode=list"
          expName="licenses-list-data"
        />
      </FullTable>
    </BoxContent>
  </section>
</template>

<script>
import _ from 'lodash'
import { mapActions, mapGetters } from 'vuex'
import {
  organizeKeysBeforeFilter,
  returnAutocompleteData,
  prepareDataForAutocomplete
} from '@/helpers/helpers.js'
import paginationMixin from '@/mixins/paginationMixin.js'
import BoxContent from '@/components/common/BoxContent.vue'
import FullTable from '@/components/common/Table/FullTable.vue'
import exportButton from '@/components/common/exportButton.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import HostLink from '@/components/common/Table/HostLink.vue'
import DrawerButton from '@/components/common/DrawerButton.vue'
import DrawerRight from '@/components/common/DrawerRight.vue'

export default {
  mixins: [paginationMixin],
  components: {
    BoxContent,
    FullTable,
    exportButton,
    TdContent,
    HostLink,
    DrawerButton,
    DrawerRight
  },
  data() {
    return {
      keys: ['hostname', 'dbName', 'licenseName', 'usedLicenses'],
      licensesUsedFilters: {},
      filteredhostname: [],
      filtereddbName: [],
      filteredlicenseName: [],
      filteredusedLicenses: [],
      minusedLicenses: null,
      maxusedLicenses: null
    }
  },
  async beforeMount() {
    await this.getLicensesList()

    this.setAutocompleteData('hostname')
    this.setAutocompleteData('dbName')
    this.setAutocompleteData('licenseName')

    this.setSliderFilterConfig('usedLicenses')
  },
  methods: {
    ...mapActions(['getLicensesList']),
    applyFilters() {
      this.$store.commit('SET_FILTERS', {
        status: true,
        filters: organizeKeysBeforeFilter(this.licensesUsedFilters)
      })
    },
    resetFilters() {
      this.$store.commit('SET_FILTERS', {
        status: false,
        filters: []
      })
      this.setSliderFilterConfig('usedLicenses')
    },
    setAutocompleteData(value) {
      this['filtered' + value] = prepareDataForAutocomplete(
        this.getUsedLicenses,
        value
      )
    },
    setFilteredAutocomplete(text, toFilter) {
      const autocomplete = returnAutocompleteData(
        text,
        this.getUsedLicenses,
        toFilter
      )

      switch (toFilter) {
        case 'hostname':
          this.filteredhostname = autocomplete
          break
        case 'dbName':
          this.filtereddbName = autocomplete
          break
        case 'licenseName':
          this.filteredlicenseName = autocomplete
          break
        case 'usedLicenses':
          this.filteredusedLicenses = autocomplete
          break
        default:
          break
      }
    },
    setSliderFilterConfig(value) {
      const fillNumbers = prepareDataForAutocomplete(
        this.getUsedLicenses,
        value
      )
      this.resolveSliderData(value, fillNumbers)
    },
    resolveSliderData(value, numbers) {
      this['filtered' + value] = numbers

      this.licensesUsedFilters[value] = [
        this['filtered' + value][0],
        _.last(this['filtered' + value])
      ]

      this['min' + value] = this['filtered' + value][0]
      this['max' + value] = _.last(this['filtered' + value])
    }
  },
  computed: {
    ...mapGetters(['getUsedLicenses'])
  },
  beforeDestroy() {
    this.resetFilters()
  }
}
</script>

<style lang="scss" scoped></style>
