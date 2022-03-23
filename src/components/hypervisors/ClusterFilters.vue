<template>
  <AdvancedFiltersBase :submitAction="apply">
    <Collapse :collapses="collapses">
      <template slot="General">
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
      autocompletes: ['virtualizationNode', 'hostname', 'name'],
      filters: {
        cappedCPU: '',
      },
    }
  },
  created() {
    this.fullData = this.getCurrentClusterVms
  },
  methods: {
    resetFilters() {
      this.filters = {
        cappedCPU: '',
      }
    },
  },
  computed: {
    ...mapGetters(['getCurrentClusterVms']),
  },
}
</script>

<style lang="scss" scoped></style>
