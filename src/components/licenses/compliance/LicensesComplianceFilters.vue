<template>
  <AdvancedFiltersBase :submitAction="apply">
    <Collapse :collapses="collapses">
      <template slot="General">
        <CustomField :label="$t('common.fields.fullAgreement')">
          <CustomSelectAutocomplete
            v-model="filters.fullPartNumber"
            :filterResult="filteredfullPartNumber"
            :filterMethod="setAutocompletes"
            field="fullPartNumber"
          />
        </CustomField>

        <CustomField :label="$t('common.fields.metric')">
          <CustomAutocomplete
            v-model="filters.metric"
            :filterResult="filteredmetric"
            :filterMethod="setAutocompletes"
          />
        </CustomField>

        <CustomField :label="$t('common.collumns.licAvailable')">
          <CustomSlider
            v-model="filters.available"
            :ticks="[minavailable, maxavailable]"
            :steps="1"
          />
        </CustomField>

        <CustomField :label="$t('common.fields.purchased')">
          <CustomSlider
            v-model="filters.purchased"
            :ticks="[minpurchased, maxpurchased]"
            :steps="1"
          />
        </CustomField>

        <CustomField :label="$t('common.fields.consumed')">
          <CustomSlider
            v-model="filters.consumed"
            :ticks="[minconsumed, maxconsumed]"
            :steps="1"
          />
        </CustomField>

        <CustomField :label="$t('common.fields.covered')">
          <CustomSlider
            v-model="filters.covered"
            :ticks="[mincovered, maxcovered]"
            :steps="1"
          />
        </CustomField>

        <CustomField :label="$t('common.fields.compliance')">
          <CustomSlider v-model="filters.compliance" percent />
        </CustomField>

        <CustomField :label="$t('common.fields.ula')">
          <CustomRadio v-model="filters.unlimited" />
        </CustomField>
      </template>
    </Collapse>

    <slot />
  </AdvancedFiltersBase>
</template>

<script>
import localFiltersMixin from '@/mixins/localFiltersMixin.js'
import CustomSelectAutocomplete from '@/components/common/Form/CustomSelectAutocomplete.vue'
import Collapse from '@/components/common/Collapse.vue'

export default {
  name: 'licenses-compliance-filters-component',
  mixins: [localFiltersMixin],
  components: {
    CustomSelectAutocomplete,
    Collapse,
  },
  data() {
    return {
      collapses: ['General'],
      autocompletes: ['fullPartNumber', 'metric'],
      sliders: ['consumed', 'covered', 'compliance', 'purchased', 'available'],
      filters: {
        unlimited: '',
      },
    }
  },
  methods: {
    resetFilters() {
      this.filters = {
        unlimited: '',
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
