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

        <CustomField label="PDB Name">
          <CustomAutocomplete
            v-model="filters.pdbName"
            :filterResult="filteredpdbName"
            :filterMethod="setAutocompletes"
          />
        </CustomField>

        <CustomField label="Flag">
          <CustomSelect v-model="filters.flag" :options="policyAuditFlags" />
        </CustomField>

        <CustomField label="Policies Audit Retrieved From DB">
          <CustomAutocomplete
            v-model="filters.policiesAudit"
            :filterResult="filteredpoliciesAudit"
            :filterMethod="setAutocompletes"
          />
        </CustomField>

        <CustomField label="Policies Audit Configured on Ercole">
          <CustomAutocomplete
            v-model="filters.policiesAuditConfigured"
            :filterResult="filteredpoliciesAuditConfigured"
            :filterMethod="setAutocompletes"
          />
        </CustomField>

        <CustomField label="Matched">
          <CustomAutocomplete
            v-model="filters.matched"
            :filterResult="filteredmatched"
            :filterMethod="setAutocompletes"
          />
        </CustomField>

        <CustomField label="Not Matched">
          <CustomAutocomplete
            v-model="filters.notmatched"
            :filterResult="filterednotmatched"
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
  name: 'databases-oracle-policy-aidit-filters-component',
  mixins: [localFiltersMixin],
  components: {
    Collapse,
  },
  data() {
    return {
      collapses: ['General'],
      autocompletes: [
        'hostname',
        'dbName',
        'pdbName',
        'matched',
        'notmatched',
        'policiesAudit',
        'policiesAuditConfigured',
      ],
      selects: ['flag'],
      policyAuditFlags: ['green', 'red', 'N/A'],
    }
  },
}
</script>

<style lang="scss" scoped></style>
