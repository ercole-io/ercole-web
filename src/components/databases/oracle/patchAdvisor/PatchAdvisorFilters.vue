<template>
  <AdvancedFiltersBase :submitAction="apply">
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

    <CustomField label="Version">
      <CustomSelect v-model="filters.dbver" :options="filtereddbver" />
    </CustomField>

    <CustomField label="PSU">
      <CustomSelect
        v-model="filters.description"
        :options="filtereddescription"
      />
    </CustomField>

    <CustomField label="4 Months">
      <CustomRadio v-model="filters.fourMonths" />
    </CustomField>

    <CustomField label="6 Months">
      <CustomRadio v-model="filters.sixMonths" />
    </CustomField>

    <CustomField label="12 Months">
      <CustomRadio v-model="filters.twelveMonths" />
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
      autocompletes: ['hostname', 'dbname'],
      selects: ['dbver', 'description'],
      filters: {
        fourMonths: '',
        sixMonths: '',
        twelveMonths: ''
      }
    }
  },
  created() {
    this.fullData = this.getOraclePatchAdvisor
  },
  methods: {
    resetFilters() {
      this.filters = {
        fourMonths: '',
        sixMonths: '',
        twelveMonths: ''
      }
    }
  },
  computed: {
    ...mapGetters(['getOraclePatchAdvisor'])
  }
}
</script>

<style lang="scss" scoped></style>
