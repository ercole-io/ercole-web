<template>
  <AdvancedFiltersBase :submitAction="apply">
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

    <CustomField :label="$t('common.fields.version')">
      <CustomSelect v-model="filters.dbver" :options="filtereddbver" />
    </CustomField>

    <CustomField :label="$t('common.fields.psu')">
      <CustomSelect
        v-model="filters.description"
        :options="filtereddescription"
      />
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

    <slot />
  </AdvancedFiltersBase>
</template>

<script>
import localFiltersMixin from '@/mixins/localFiltersMixin.js'

export default {
  mixins: [localFiltersMixin],
  data() {
    return {
      autocompletes: ['hostname', 'dbname'],
      selects: ['dbver', 'description'],
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
