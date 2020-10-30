<template>
  <section>
    <DrawerFilters title="Licenses Used Filters">
      <form @submit.prevent="apply">
        <b-field label="Hostname" custom-class="is-small">
          <b-autocomplete
            v-model="filters.hostname"
            size="is-small"
            type="number"
            clearable
            :data="filteredData"
            @typing="
              setFilteredAutocomplete($event, 'hostname', getUsedLicenses)
            "
          >
            <template slot="empty">No results found</template>
          </b-autocomplete>
        </b-field>

        <b-field label="DB Name" custom-class="is-small">
          <b-autocomplete
            v-model="filters.dbName"
            size="is-small"
            type="number"
            clearable
            :data="filteredData"
            @typing="setFilteredAutocomplete($event, 'dbName', getUsedLicenses)"
          >
            <template slot="empty">No results found</template>
          </b-autocomplete>
        </b-field>

        <b-field label="License Name" custom-class="is-small">
          <b-autocomplete
            v-model="filters.licenseName"
            size="is-small"
            type="number"
            clearable
            :data="filteredData"
            @typing="
              setFilteredAutocomplete($event, 'licenseName', getUsedLicenses)
            "
          >
            <template slot="empty">No results found</template>
          </b-autocomplete>
        </b-field>

        <b-field label="Used Licenses" custom-class="is-small">
          <b-slider
            v-model="filters.usedLicenses"
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
    </DrawerFilters>
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
import paginationMixin from '@/mixins/paginationMixin.js'
import localFiltersMixin from '@/mixins/localFiltersMixin.js'
import BoxContent from '@/components/common/BoxContent.vue'
import FullTable from '@/components/common/Table/FullTable.vue'
import exportButton from '@/components/common/exportButton.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import HostLink from '@/components/common/Table/HostLink.vue'
import DrawerButton from '@/components/common/DrawerButton.vue'
import DrawerFilters from '@/components/common/DrawerFilters.vue'

export default {
  mixins: [paginationMixin, localFiltersMixin],
  components: {
    BoxContent,
    FullTable,
    exportButton,
    TdContent,
    HostLink,
    DrawerButton,
    DrawerFilters
  },
  data() {
    return {
      keys: ['hostname', 'dbName', 'licenseName', 'usedLicenses'],
      filteredusedLicenses: [],
      minusedLicenses: null,
      maxusedLicenses: null
    }
  },
  async beforeMount() {
    await this.getLicensesList()

    this.setAutocomplete()
    this.setSlider()
  },
  methods: {
    ...mapActions(['getLicensesList']),
    resetFilters() {
      this.reset()
      this.setSlider()
    },
    setAutocomplete() {
      this.setAutocompleteData('hostname', this.getUsedLicenses)
      this.setAutocompleteData('dbName', this.getUsedLicenses)
      this.setAutocompleteData('licenseName', this.getUsedLicenses)
    },
    setSlider() {
      this.setSliderFilterConfig('usedLicenses', this.getUsedLicenses)
    }
  },
  computed: {
    ...mapGetters(['getUsedLicenses'])
  }
}
</script>

<style lang="scss" scoped></style>
