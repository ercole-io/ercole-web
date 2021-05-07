<template>
  <AdvancedFiltersBase :submitAction="apply">
    <CustomField label="Performance Impact">
      <b-slider
        v-model="filters.benefit"
        :min="minbenefit"
        :max="maxbenefit"
        :step="0.11"
      >
        <b-slider-tick :value="minbenefit">
          {{ minbenefit }}
        </b-slider-tick>
        <b-slider-tick :value="maxbenefit">
          {{ maxbenefit }}
        </b-slider-tick>
      </b-slider>
    </CustomField>

    <CustomField label="Hostname">
      <b-autocomplete
        v-model="filters.hostname"
        size="is-small"
        clearable
        :data="filteredData"
        @typing="setFilteredAutocomplete($event, 'hostname', getOracleAddms)"
      />
    </CustomField>

    <CustomField label="Database">
      <b-autocomplete
        v-model="filters.dbname"
        size="is-small"
        clearable
        :data="filteredData"
        @typing="setFilteredAutocomplete($event, 'dbname', getOracleAddms)"
      />
    </CustomField>

    <CustomField label="Finding">
      <b-select
        v-model="filters.finding"
        size="is-small"
        placeholder="Select an Finding"
        expanded
      >
        <option :value="null" v-if="filters.finding">
          Reset
        </option>
        <option v-for="(env, index) in filteredFinding" :key="index">
          {{ env }}
        </option>
      </b-select>
    </CustomField>

    <CustomField label="Recommendation">
      <b-select
        v-model="filters.recommendation"
        size="is-small"
        placeholder="Select an Recommendation"
        expanded
      >
        <option :value="null" v-if="filters.recommendation">
          Reset
        </option>
        <option v-for="(env, index) in filteredRecommendation" :key="index">
          {{ env }}
        </option>
      </b-select>
    </CustomField>

    <CustomField label="Action">
      <b-autocomplete
        v-model="filters.action"
        size="is-small"
        clearable
        :data="filteredData"
        @typing="setFilteredAutocomplete($event, 'action', getOracleAddms)"
      />
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
      filteredFinding: [],
      filteredRecommendation: []
    }
  },
  beforeMount() {
    this.filteredFinding = prepareDataForAutocomplete(
      this.getOracleAddms,
      'finding'
    )
    this.filteredRecommendation = prepareDataForAutocomplete(
      this.getOracleAddms,
      'recommendation'
    )
    this.setSlider()

    bus.$on('onResetAction', () => this.reset(this.resetFilters))
  },
  methods: {
    resetFilters() {
      this.setSlider()
    },
    setSlider() {
      this.setSliderFilterConfig('benefit', this.getOracleAddms)
    }
  },
  computed: {
    ...mapGetters(['getOracleAddms'])
  }
}
</script>

<style lang="scss" scoped></style>
