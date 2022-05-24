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

        <CustomField label="Grantee">
          <CustomSelect v-model="filters.grantee" :options="filteredgrantee" />
        </CustomField>

        <CustomField label="Admin Option">
          <CustomRadio v-model="filters.adminOption" />
        </CustomField>

        <CustomField label="Default Role">
          <CustomRadio v-model="filters.defaultRole" />
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
  mixins: [localFiltersMixin],
  components: {
    Collapse,
  },
  data() {
    return {
      collapses: ['General'],
      autocompletes: ['hostname', 'dbName'],
      selects: ['grantee'],
      filters: {
        adminOption: '',
        defaultRole: '',
      },
    }
  },
  methods: {
    resetFilters() {
      this.filters = {
        adminOption: '',
        defaultRole: '',
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
