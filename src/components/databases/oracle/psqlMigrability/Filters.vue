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
            v-model="filters.dbname"
            :filterResult="filtereddbname"
            :filterMethod="setAutocompletes"
          />
        </CustomField>

        <CustomField label="PDB Name">
          <CustomAutocomplete
            v-model="filters.pdbname"
            :filterResult="filteredpdbname"
            :filterMethod="setAutocompletes"
          />
        </CustomField>

        <CustomField label="Flag">
          <CustomSelect v-model="filters.flag" :options="policyAuditFlags" />
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
  name: 'databases-oracle-psql-migrability-filters-component',
  mixins: [localFiltersMixin],
  components: {
    Collapse,
  },
  data() {
    return {
      collapses: ['General'],
      autocompletes: ['hostname', 'dbname', 'pdbname'],
      selects: ['flag'],
      policyAuditFlags: ['green', 'yellow', 'red', 'N/A'],
    }
  },
}
</script>

<style lang="scss" scoped></style>
