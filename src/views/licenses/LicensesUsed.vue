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
              :data="filteredHostnames"
              @typing="getAutocompleteData($event, 'hostname')"
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
              :data="filteredDbnames"
              @typing="getAutocompleteData($event, 'dbName')"
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
              :data="filteredLicenseName"
              @typing="getAutocompleteData($event, 'licenseName')"
            >
              <template slot="empty">No results found</template>
            </b-autocomplete>
          </b-field>

          <b-field label="Used Licenses" custom-class="is-small">
            <b-autocomplete
              class="mr-1"
              v-model="usedLicensesMin"
              size="is-small"
              :data="filteredUsedLicenses"
              @typing="getAutocompleteData($event, 'usedLicenses')"
            >
            </b-autocomplete>
            <b-autocomplete
              class="ml-1"
              v-model="usedLicensesMax"
              size="is-small"
              :data="filteredUsedLicenses"
              @typing="getAutocompleteData($event, 'usedLicenses')"
            >
            </b-autocomplete>
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
      usedLicensesMin: null,
      usedLicensesMax: null,
      licensesUsedFilters: {},
      filteredHostnames: [],
      filteredDbnames: [],
      filteredLicenseName: [],
      filteredUsedLicenses: []
    }
  },
  async beforeMount() {
    await this.getLicensesList()

    this.filteredHostnames = prepareDataForAutocomplete(
      this.getUsedLicenses,
      'hostname'
    )

    this.filteredDbnames = prepareDataForAutocomplete(
      this.getUsedLicenses,
      'dbName'
    )

    this.filteredLicenseName = prepareDataForAutocomplete(
      this.getUsedLicenses,
      'licenseName'
    )

    this.filteredUsedLicenses = prepareDataForAutocomplete(
      this.getUsedLicenses,
      'usedLicenses'
    )
  },
  methods: {
    ...mapActions(['getLicensesList']),
    applyFilters() {
      if (this.usedLicensesMax) {
        this.licensesUsedFilters.usedLicenses = [
          Number(this.usedLicensesMin),
          Number(this.usedLicensesMax)
        ]
      } else {
        this.licensesUsedFilters.usedLicenses = Number(this.usedLicensesMin)
      }

      this.$store.commit('SET_FILTERS', {
        status: true,
        filters: organizeKeysBeforeFilter(this.licensesUsedFilters)
      })
    },
    resetFilters() {
      this.usedLicensesMin = null
      this.usedLicensesMax = null
      this.licensesUsedFilters = {}
      this.$store.commit('SET_FILTERS', {
        status: false,
        filters: []
      })
    },
    getAutocompleteData(text, toFilter) {
      const autocomplete = returnAutocompleteData(
        text,
        this.getUsedLicenses,
        toFilter
      )

      switch (toFilter) {
        case 'hostname':
          this.filteredHostnames = autocomplete
          break
        case 'dbName':
          this.filteredDbnames = autocomplete
          break
        case 'licenseName':
          this.filteredLicenseName = autocomplete
          break
        case 'usedLicenses':
          this.filteredUsedLicenses = autocomplete
          break
        default:
          break
      }
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
