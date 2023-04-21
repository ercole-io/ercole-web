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

        <CustomField label="Patch Action">
          <CustomSelect
            v-model="filters.patchAction"
            :options="filteredpatchAction"
          />
        </CustomField>

        <CustomField label="Patch Date">
          <CustomDatepicker v-model="startDate" />
        </CustomField>

        <CustomField label="Patch Description">
          <CustomAutocomplete
            v-model="filters.patchDesc"
            :filterResult="filteredpatchDesc"
            :filterMethod="setAutocompletes"
          />
        </CustomField>

        <CustomField label="Patch ID">
          <CustomAutocomplete
            v-model="filters.patchID"
            :filterResult="filteredpatchID"
            :filterMethod="setAutocompletes"
          />
        </CustomField>

        <CustomField label="Patch Version">
          <CustomSelect
            v-model="filters.patchVersion"
            :options="filteredpatchVersion"
          />
        </CustomField>
      </template>
    </Collapse>

    <slot />
  </AdvancedFiltersBase>
</template>

<script>
import moment from 'moment'
import localFiltersMixin from '@/mixins/localFiltersMixin.js'
import Collapse from '@/components/common/Collapse.vue'

export default {
  name: 'databases-oracle-patch-filters-component',
  mixins: [localFiltersMixin],
  components: {
    Collapse,
  },
  data() {
    return {
      collapses: ['General'],
      autocompletes: ['hostname', 'dbName', 'patchDesc', 'patchID'],
      selects: ['patchAction', 'patchVersion'],
      filters: {
        patchDate: null,
      },
      startDate: null,
    }
  },
  methods: {
    resetFilters() {
      this.filters = {
        patchDate: null,
      }
      this.startDate = null
    },
  },
  watch: {
    startDate(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.filters = {
          patchDate: moment(this.startDate).format('DD/MM/YYYY'),
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
