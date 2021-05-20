<template>
  <AdvancedFiltersBase :submitAction="apply">
    <CustomField label="Hostname">
      <b-autocomplete
        v-model="filters.hostname"
        size="is-small"
        type="number"
        clearable
        :data="filteredData"
        @typing="setFilteredAutocomplete($event, 'hostname', getUsedLicenses)"
      />
    </CustomField>

    <CustomField label="DB Name">
      <b-autocomplete
        v-model="filters.dbName"
        size="is-small"
        type="number"
        clearable
        :data="filteredData"
        @typing="setFilteredAutocomplete($event, 'dbName', getUsedLicenses)"
      />
    </CustomField>

    <CustomField label="Part Number">
      <b-select
        v-model="filters.licenseTypeID"
        size="is-small"
        placeholder="Select a Part Number"
        expanded
      >
        <option :value="null" v-if="filters.licenseTypeID">
          Reset
        </option>
        <option v-for="(part, index) in filteredLicenseTypeID" :key="index">
          {{ part }}
        </option>
      </b-select>
    </CustomField>

    <CustomField label="Description">
      <b-select
        v-model="filters.description"
        size="is-small"
        placeholder="Select a Description"
        expanded
      >
        <option :value="null" v-if="filters.description">
          Reset
        </option>
        <option v-for="(desc, index) in filteredDescription" :key="index">
          {{ desc }}
        </option>
      </b-select>
    </CustomField>

    <CustomField label="Metric">
      <b-select
        v-model="filters.metric"
        size="is-small"
        placeholder="Select a Metric"
        expanded
      >
        <option :value="null" v-if="filters.metric">
          Reset
        </option>
        <option v-for="(met, index) in filteredMetric" :key="index">
          {{ met }}
        </option>
      </b-select>
    </CustomField>

    <CustomField label="Used Licenses">
      <b-slider
        v-model="filters.usedLicenses"
        :min="minusedLicenses"
        :max="maxusedLicenses"
        :step="0.01"
      >
        <!-- <template v-for="val in filteredusedLicenses">
            <b-slider-tick :value="val" :key="val">{{ val }}</b-slider-tick>
          </template> -->

        <b-slider-tick :value="minusedLicenses">
          {{ minusedLicenses }}
        </b-slider-tick>
        <b-slider-tick :value="maxusedLicenses">
          {{ maxusedLicenses }}
        </b-slider-tick>
      </b-slider>
    </CustomField>
  </AdvancedFiltersBase>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { mapGetters } from 'vuex'
import { prepareDataForAutocomplete } from '@/helpers/helpers.js'
import localFiltersMixin from '@/mixins/localFiltersMixin.js'
import AdvancedFiltersBase from '@/components/common/AdvancedFiltersBase.vue'
import CustomField from '@/components/common/Form/CustomField.vue'

export default {
  mixins: [localFiltersMixin],
  components: {
    AdvancedFiltersBase,
    CustomField
  },
  data() {
    return {
      filteredusedLicenses: [],
      filteredLicenseTypeID: [],
      filteredDescription: [],
      filteredMetric: []
    }
  },
  beforeMount() {
    this.filteredLicenseTypeID = prepareDataForAutocomplete(
      this.getUsedLicenses,
      'licenseTypeID'
    )
    this.filteredDescription = prepareDataForAutocomplete(
      this.getUsedLicenses,
      'description'
    )
    this.filteredMetric = prepareDataForAutocomplete(
      this.getUsedLicenses,
      'metric'
    )

    this.setSlider()

    bus.$on('onResetAction', () => this.reset(this.resetFilters))
  },
  methods: {
    resetFilters() {
      this.setSlider()
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
