<template>
  <AdvancedFiltersBase :submitAction="apply">
    <CustomField label="Reclaimable">
      <b-slider
        v-model="filters.reclaimable"
        :min="minreclaimable"
        :max="maxreclaimable"
        :step="0.01"
      >
        <b-slider-tick :value="minreclaimable">
          {{ minreclaimable }}
        </b-slider-tick>
        <b-slider-tick :value="maxreclaimable">
          {{ maxreclaimable }}
        </b-slider-tick>
      </b-slider>
    </CustomField>

    <CustomField label="GB Total">
      <b-slider
        v-model="filters.segmentsSize"
        :min="minsegmentsSize"
        :max="maxsegmentsSize"
        :step="0.01"
      >
        <b-slider-tick :value="minsegmentsSize">
          {{ minsegmentsSize }}
        </b-slider-tick>
        <b-slider-tick :value="maxsegmentsSize">
          {{ maxsegmentsSize }}
        </b-slider-tick>
      </b-slider>
    </CustomField>

    <CustomField label="Retrieve">
      <b-slider
        v-model="filters.retrieve"
        format="percent"
        :tooltip="false"
        indicator
      />
    </CustomField>

    <CustomField label="Hostname">
      <b-autocomplete
        v-model="filters.hostname"
        size="is-small"
        clearable
        :data="filteredData"
        @typing="
          setFilteredAutocomplete($event, 'hostname', getOracleSegmentAdvisor)
        "
      />
    </CustomField>

    <CustomField label="DB Name">
      <b-autocomplete
        v-model="filters.dbname"
        size="is-small"
        clearable
        :data="filteredData"
        @typing="
          setFilteredAutocomplete($event, 'dbname', getOracleSegmentAdvisor)
        "
      />
    </CustomField>

    <CustomField label="Segment Owner">
      <b-autocomplete
        v-model="filters.segmentOwner"
        size="is-small"
        clearable
        :data="filteredData"
        @typing="
          setFilteredAutocomplete(
            $event,
            'segmentOwner',
            getOracleSegmentAdvisor
          )
        "
      />
    </CustomField>

    <CustomField label="Segment Name">
      <b-autocomplete
        v-model="filters.segmentName"
        size="is-small"
        clearable
        :data="filteredData"
        @typing="
          setFilteredAutocomplete(
            $event,
            'segmentName',
            getOracleSegmentAdvisor
          )
        "
      />
    </CustomField>

    <CustomField label="Segment Type">
      <b-select
        v-model="filters.segmentType"
        size="is-small"
        placeholder="Select a Segment Type"
        expanded
      >
        <option :value="null" v-if="filters.segmentType">
          Reset
        </option>
        <option v-for="(env, index) in filteredSegmentType" :key="index">
          {{ env }}
        </option>
      </b-select>
    </CustomField>

    <CustomField label="Recommendation">
      <b-autocomplete
        v-model="filters.recommendation"
        size="is-small"
        clearable
        :data="filteredData"
        @typing="
          setFilteredAutocomplete(
            $event,
            'recommendation',
            getOracleSegmentAdvisor
          )
        "
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
      filteredSegmentType: []
    }
  },
  beforeMount() {
    this.filteredSegmentType = prepareDataForAutocomplete(
      this.getOracleSegmentAdvisor,
      'segmentType'
    )
    this.setSlider()

    bus.$on('onResetAction', () => this.reset(this.resetFilters))
  },
  methods: {
    resetFilters() {
      this.setSlider()
    },
    setSlider() {
      this.setSliderFilterConfig('reclaimable', this.getOracleSegmentAdvisor)
      this.setSliderFilterConfig('segmentsSize', this.getOracleSegmentAdvisor)
      this.setSliderFilterConfig('retrieve', this.getOracleSegmentAdvisor)
    }
  },
  computed: {
    ...mapGetters(['getOracleSegmentAdvisor'])
  }
}
</script>

<style lang="scss" scoped></style>
