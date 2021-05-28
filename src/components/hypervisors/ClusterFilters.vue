<template>
  <AdvancedFiltersBase :submitAction="apply">
    <CustomField label="Physical Host">
      <CustomAutocomplete
        v-model="filters.virtualizationNode"
        :filterResult="filteredvirtualizationNode"
        :filterMethod="setAutocompletes"
      />
    </CustomField>

    <CustomField label="Hostname">
      <CustomAutocomplete
        v-model="filters.hostname"
        :filterResult="filteredhostname"
        :filterMethod="setAutocompletes"
      />
    </CustomField>

    <CustomField label="VM Name">
      <CustomAutocomplete
        v-model="filters.name"
        :filterResult="filteredname"
        :filterMethod="setAutocompletes"
      />
    </CustomField>

    <CustomField label="Capped CPU">
      <CustomRadio v-model="filters.cappedCPU" />
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
      autocompletes: ['virtualizationNode', 'hostname', 'name'],
      filters: {
        cappedCPU: ''
      }
    }
  },
  created() {
    this.fullData = this.getCurrentClusterVms
  },
  methods: {
    resetFilters() {
      this.filters = {
        cappedCPU: ''
      }
    }
  },
  computed: {
    ...mapGetters(['getCurrentClusterVms'])
  }
}
</script>

<style lang="scss" scoped></style>
