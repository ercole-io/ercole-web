<template>
  <AdvancedFiltersBase :submitAction="apply" setMinHeight="560">
    <Collapse :collapses="collapses">
      <template slot="General">
        <CustomField :label="$t('common.collumns.reclaimable')">
          <CustomSlider
            v-model="filters.reclaimable"
            :ticks="[minreclaimable, maxreclaimable]"
            :steps="0.01"
          />
        </CustomField>

        <CustomField :label="$t('common.collumns.totalGB')">
          <CustomSlider
            v-model="filters.segmentsSize"
            :ticks="[minsegmentsSize, maxsegmentsSize]"
            :steps="0.01"
          />
        </CustomField>

        <CustomField :label="$t('common.collumns.retrieve')">
          <CustomSlider v-model="filters.retrieve" percent />
        </CustomField>

        <CustomField :label="$t('common.collumns.hostname')">
          <CustomAutocomplete
            v-model="filters.hostname"
            :filterResult="filteredhostname"
            :filterMethod="setAutocompletes"
          />
        </CustomField>

        <CustomField :label="$t('common.collumns.name')">
          <CustomAutocomplete
            v-model="filters.dbname"
            :filterResult="filtereddbname"
            :filterMethod="setAutocompletes"
          />
        </CustomField>

        <CustomField :label="$t('common.collumns.segmentOwner')">
          <CustomAutocomplete
            v-model="filters.segmentOwner"
            :filterResult="filteredsegmentOwner"
            :filterMethod="setAutocompletes"
          />
        </CustomField>

        <CustomField :label="$t('common.collumns.segmentName')">
          <CustomAutocomplete
            v-model="filters.segmentName"
            :filterResult="filteredsegmentName"
            :filterMethod="setAutocompletes"
          />
        </CustomField>

        <CustomField :label="$t('common.collumns.segmentType')">
          <CustomSelect
            v-model="filters.segmentType"
            :options="filteredsegmentType"
          />
        </CustomField>

        <CustomField :label="$t('common.collumns.recommendation')">
          <CustomAutocomplete
            v-model="filters.recommendation"
            :filterResult="filteredrecommendation"
            :filterMethod="setAutocompletes"
          />
        </CustomField>
      </template>
    </Collapse>
  </AdvancedFiltersBase>
</template>

<script>
import { mapGetters } from 'vuex'
import localFiltersMixin from '@/mixins/localFiltersMixin.js'
import Collapse from '@/components/common/Collapse.vue'

export default {
  mixins: [localFiltersMixin],
  components: {
    Collapse,
  },
  data() {
    return {
      collapses: ['General'],
      autocompletes: [
        'hostname',
        'dbname',
        'segmentOwner',
        'segmentName',
        'recommendation',
      ],
      selects: ['segmentType'],
      sliders: ['reclaimable', 'segmentsSize', 'retrieve'],
    }
  },
  created() {
    this.fullData = this.getOracleSegmentAdvisor
  },
  computed: {
    ...mapGetters(['getOracleSegmentAdvisor']),
  },
}
</script>

<style lang="scss" scoped></style>
