<template>
  <AdvancedFiltersBase
    filterTitle="Licenses Used Filters"
    :submitAction="apply"
  >
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
        v-model="filters.itemDescription"
        size="is-small"
        placeholder="Select a Description"
        expanded
      >
        <option :value="null" v-if="filters.itemDescription">
          Reset
        </option>
        <option v-for="(desc, index) in filteredItemDescription" :key="index">
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

    <CustomField label="Consumed">
      <b-slider
        v-model="filters.consumed"
        :min="minconsumed"
        :max="maxconsumed"
        :step="0.1"
      >
        <b-slider-tick :value="minconsumed">
          {{ minconsumed }}
        </b-slider-tick>
        <b-slider-tick :value="maxconsumed">
          {{ maxconsumed }}
        </b-slider-tick>
      </b-slider>
    </CustomField>

    <CustomField label="Covered">
      <b-slider
        v-model="filters.covered"
        :min="mincovered"
        :max="maxcovered"
        :step="0.1"
      >
        <b-slider-tick :value="mincovered">
          {{ mincovered }}
        </b-slider-tick>
        <b-slider-tick :value="maxcovered">
          {{ maxcovered }}
        </b-slider-tick>
      </b-slider>
    </CustomField>

    <CustomField label="Comnpliance">
      <b-slider
        v-model="filters.compliance"
        format="percent"
        :tooltip="false"
        indicator
      />
    </CustomField>

    <CustomField label="ULA">
      <div class="is-flex" style="justify-content: space-around;">
        <b-radio
          size="is-small"
          v-model="filters.unlimited"
          native-value="true"
        >
          Yes
        </b-radio>
        <b-radio
          size="is-small"
          v-model="filters.unlimited"
          native-value="false"
        >
          No
        </b-radio>
        <b-radio size="is-small" v-model="filters.unlimited" native-value="">
          All
        </b-radio>
      </div>
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
      filteredLicenseTypeID: [],
      filteredItemDescription: [],
      filteredMetric: [],
      filters: {
        unlimited: ''
      }
    }
  },
  beforeMount() {
    this.filteredLicenseTypeID = prepareDataForAutocomplete(
      this.getLicensesCompliance,
      'licenseTypeID'
    )
    this.filteredItemDescription = prepareDataForAutocomplete(
      this.getLicensesCompliance,
      'itemDescription'
    )
    this.filteredMetric = prepareDataForAutocomplete(
      this.getLicensesCompliance,
      'metric'
    )
    this.setSlider()

    bus.$on('onResetAction', () => this.reset(this.resetFilters))
  },
  methods: {
    resetFilters() {
      this.filters = {
        unlimited: ''
      }
      this.setSlider()
    },
    setSlider() {
      this.setSliderFilterConfig('consumed', this.getLicensesCompliance)
      this.setSliderFilterConfig('covered', this.getLicensesCompliance)
      this.setSliderFilterConfig('compliance', this.getLicensesCompliance)
    }
  },
  computed: {
    ...mapGetters(['getLicensesCompliance'])
  }
}
</script>

<style lang="scss" scoped></style>
