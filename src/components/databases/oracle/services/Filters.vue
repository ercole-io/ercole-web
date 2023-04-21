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

        <CustomField :label="$t('common.fields.name')">
          <CustomAutocomplete
            v-model="filters.dbName"
            :filterResult="filtereddbName"
            :filterMethod="setAutocompletes"
          />
        </CustomField>

        <CustomField label="Service Name">
          <CustomAutocomplete
            v-model="filters.servName"
            :filterResult="filteredservName"
            :filterMethod="setAutocompletes"
          />
        </CustomField>

        <CustomField label="Enabled">
          <CustomRadio v-model="filters.servEnabled" />
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
  name: 'databases-oracle-services-filters-component',
  mixins: [localFiltersMixin],
  components: {
    Collapse,
  },
  data() {
    return {
      collapses: ['General'],
      autocompletes: ['hostname', 'dbName', 'servName'],
      filters: {
        servEnabled: '',
      },
    }
  },
  methods: {
    resetFilters() {
      this.filters = {
        servEnabled: '',
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
