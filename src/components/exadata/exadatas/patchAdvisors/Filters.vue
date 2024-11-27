<template>
  <AdvancedFiltersBase :submitAction="apply">
    <Collapse :collapses="collapses">
      <template slot="General">
        <CustomField :label="$t('common.fields.hostname')">
          <CustomAutocomplete
            v-model="filters.hostname"
            :filterResult="filteredhostname"
            :filterMethod="setAutocompletes"
          />
        </CustomField>

        <CustomField label="Rack ID">
          <CustomAutocomplete
            v-model="filters.rackID"
            :filterResult="filteredrackID"
            :filterMethod="setAutocompletes"
          />
        </CustomField>

        <CustomField label="Image Version">
          <CustomSelect
            v-model="filters.imageVersion"
            :options="filteredimageVersion"
          />
        </CustomField>

        <CustomField label="Release Date">
          <CustomSelect v-model="filters.date" :options="filtereddate" />
        </CustomField>

        <CustomField :label="$t('common.fields.months', ['4'])">
          <CustomRadio v-model="filters.fourMonths" />
        </CustomField>

        <CustomField :label="$t('common.fields.months', ['6'])">
          <CustomRadio v-model="filters.sixMonths" />
        </CustomField>

        <CustomField :label="$t('common.fields.months', ['12'])">
          <CustomRadio v-model="filters.twelveMonths" />
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
  name: 'databases-oracle-patchadvisor-filters-component',
  mixins: [localFiltersMixin],
  components: {
    Collapse,
  },
  data() {
    return {
      collapses: ['General'],
      autocompletes: ['hostname', 'rackID'],
      selects: ['imageVersion', 'date'],
      filters: {
        fourMonths: '',
        sixMonths: '',
        twelveMonths: '',
      },
    }
  },
  methods: {
    resetFilters() {
      this.filters = {
        fourMonths: '',
        sixMonths: '',
        twelveMonths: '',
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
