<template>
  <AdvancedFiltersBase :submitAction="apply">
    <CustomField :label="$t('common.fields.physicalHost')">
      <CustomAutocomplete
        v-model="filters.virtualizationNode"
        :filterResult="filteredvirtualizationNode"
        :filterMethod="setAutocompletes"
      />
    </CustomField>

    <CustomField :label="$t('common.fields.hostname')">
      <CustomAutocomplete
        v-model="filters.hostname"
        :filterResult="filteredhostname"
        :filterMethod="setAutocompletes"
      />
    </CustomField>

    <CustomField :label="$t('common.fields.vmName')">
      <CustomAutocomplete
        v-model="filters.name"
        :filterResult="filteredname"
        :filterMethod="setAutocompletes"
      />
    </CustomField>

    <CustomField :label="$t('common.fields.cappedCpu')">
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
