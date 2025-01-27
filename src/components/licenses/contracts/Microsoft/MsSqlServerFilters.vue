<template>
  <AdvancedFiltersBase :submitAction="apply">
    <Collapse :collapses="collapses">
      <template slot="General">
        <CustomField label="Type">
          <CustomSelect v-model="filters.type" :options="filteredtype" />
        </CustomField>

        <CustomField label="Licenses Types">
          <CustomSelectAutocomplete
            v-model="filters.fullPartNumber"
            :filterResult="filteredfullPartNumber"
            :filterMethod="setAutocompletes"
            field="fullPartNumber"
          />
        </CustomField>

        <CustomField label="Contract ID">
          <CustomAutocomplete
            v-model="filters.contractID"
            :filterResult="filteredcontractID"
            :filterMethod="setAutocompletes"
          />
        </CustomField>

        <CustomField :label="$t('common.fields.numberLicenses')">
          <CustomAutocomplete
            v-model="filters.licensesNumber"
            :filterResult="filteredlicensesNumber"
            :filterMethod="setAutocompletes"
          />
        </CustomField>

        <CustomField label="Location">
          <CustomAutocomplete
            v-model="filters.location"
            :filterResult="filteredlocation"
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
import CustomSelectAutocomplete from '@/components/common/Form/CustomSelectAutocomplete.vue'

export default {
  name: 'licenses-contracts-microsoft-filters-component',
  mixins: [localFiltersMixin],
  components: {
    Collapse,
    CustomSelectAutocomplete,
  },
  data() {
    return {
      collapses: ['General'],
      autocompletes: [
        'contractID',
        'licensesNumber',
        'fullPartNumber',
        'location',
      ],
      selects: ['type'],
    }
  },
  computed: {
    ...mapGetters(['getMicrosoftContracts']),
  },
}
</script>

<style lang="scss" scoped></style>
