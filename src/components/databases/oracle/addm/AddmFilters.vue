<template>
  <AdvancedFiltersBase :submitAction="apply">
    <CustomField label="Performance Impact">
      <CustomSlider
        v-model="filters.benefit"
        :ticks="[minbenefit, maxbenefit]"
        :steps="0.11"
      />
    </CustomField>

    <CustomField label="Hostname">
      <CustomAutocomplete
        v-model="filters.hostname"
        :filterResult="filteredhostname"
        :filterMethod="setAutocompletes"
      />
    </CustomField>

    <CustomField label="Database">
      <CustomAutocomplete
        v-model="filters.dbname"
        :filterResult="filtereddbname"
        :filterMethod="setAutocompletes"
      />
    </CustomField>

    <CustomField label="Finding">
      <CustomSelect v-model="filters.finding" :options="filteredfinding" />
    </CustomField>

    <CustomField label="Recommendation">
      <CustomSelect
        v-model="filters.recommendation"
        :options="filteredrecommendation"
      />
    </CustomField>

    <CustomField label="Action">
      <CustomAutocomplete
        v-model="filters.action"
        :filterResult="filteredaction"
        :filterMethod="setAutocompletes"
      />
    </CustomField>
  </AdvancedFiltersBase>
</template>

<script>
import { mapGetters } from 'vuex'
import localFiltersMixin from '@/mixins/localFiltersMixin.js'

export default {
  mixins: [localFiltersMixin],
  data() {
    return {
      autocompletes: ['hostname', 'dbname', 'action'],
      selects: ['finding', 'recommendation'],
      sliders: ['benefit']
    }
  },
  created() {
    this.fullData = this.getOracleAddms
  },
  computed: {
    ...mapGetters(['getOracleAddms'])
  }
}
</script>

<style lang="scss" scoped></style>
