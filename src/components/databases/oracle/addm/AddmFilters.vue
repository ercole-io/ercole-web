<template>
  <AdvancedFiltersBase :submitAction="apply">
    <Collapse :collapses="collapses">
      <template slot="General">
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
      </template>
    </Collapse>

    <slot />
  </AdvancedFiltersBase>
</template>

<script>
import localFiltersMixin from '@/mixins/localFiltersMixin.js'
import Collapse from '@/components/common/Collapse.vue'

export default {
  name: 'databases-oracle-addm-filters-component',
  mixins: [localFiltersMixin],
  components: {
    Collapse,
  },
  data() {
    return {
      collapses: ['General'],
      autocompletes: ['hostname', 'dbname', 'action'],
      selects: ['finding', 'recommendation'],
      sliders: ['benefit'],
    }
  },
}
</script>

<style lang="scss" scoped></style>
