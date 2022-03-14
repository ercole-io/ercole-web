<template>
  <AdvancedFiltersBase :submitAction="apply" setMinHeight="558">
    <CustomField :label="$t('common.fields.perfImpact')">
      <CustomSlider
        v-model="filters.benefit"
        :ticks="[minbenefit, maxbenefit]"
        :steps="0.11"
      />
    </CustomField>

    <CustomField :label="$t('common.fields.hostname')">
      <CustomAutocomplete
        v-model="filters.hostname"
        :filterResult="filteredhostname"
        :filterMethod="setAutocompletes"
      />
    </CustomField>

    <CustomField :label="$t('common.fields.dbs')">
      <CustomAutocomplete
        v-model="filters.dbname"
        :filterResult="filtereddbname"
        :filterMethod="setAutocompletes"
      />
    </CustomField>

    <CustomField :label="$t('common.fields.finding')">
      <CustomSelect v-model="filters.finding" :options="filteredfinding" />
    </CustomField>

    <CustomField :label="$t('common.fields.recommendation')">
      <CustomSelect
        v-model="filters.recommendation"
        :options="filteredrecommendation"
      />
    </CustomField>

    <CustomField :label="$t('common.fields.action')">
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
      sliders: ['benefit'],
    }
  },
  created() {
    this.fullData = this.getOracleAddms
  },
  computed: {
    ...mapGetters(['getOracleAddms']),
  },
}
</script>

<style lang="scss" scoped></style>
