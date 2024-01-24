<template>
  <AdvancedFiltersBase :submitAction="apply">
    <Collapse :collapses="collapses">
      <template slot="General">
        <CustomField label="Type">
          <CustomSelect v-model="filters.type" :options="filteredtype" />
        </CustomField>

        <CustomField :label="$t('common.fields.agreeNumber')">
          <CustomAutocomplete
            v-model="filters.contractID"
            :filterResult="filteredcontractID"
            :filterMethod="setAutocompletes"
          />
        </CustomField>

        <CustomField :label="$t('common.fields.csi')">
          <CustomAutocomplete
            v-model="filters.csi"
            :filterResult="filteredcsi"
            :filterMethod="setAutocompletes"
          />
        </CustomField>

        <CustomField :label="$t('common.fields.numberLicenses')">
          <CustomAutocomplete
            v-model="filters.numberOfLicenses"
            :filterResult="filterednumberOfLicenses"
            :filterMethod="setAutocompletes"
          />
        </CustomField>
      </template>
    </Collapse>

    <slot />
  </AdvancedFiltersBase>
</template>

<script>
import { mapGetters } from 'vuex'
import localFiltersMixin from '@/mixins/localFiltersMixin.js'
import Collapse from '@/components/common/Collapse.vue'

export default {
  name: 'licenses-contracts-mysql-filters-component',
  mixins: [localFiltersMixin],
  components: {
    Collapse,
  },
  data() {
    return {
      collapses: ['General'],
      autocompletes: ['contractID', 'csi', 'numberOfLicenses'],
      selects: ['type'],
    }
  },
  computed: {
    ...mapGetters(['getMysqlContracts']),
  },
}
</script>

<style lang="scss" scoped></style>
