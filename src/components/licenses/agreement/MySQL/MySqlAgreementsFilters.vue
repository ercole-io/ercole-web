<template>
  <AdvancedFiltersBase :submitAction="apply" setMinHeight="560">
    <CustomField :label="$t('common.fields.type')">
      <CustomSelect v-model="filters.type" :options="filteredtype" />
    </CustomField>

    <CustomField :label="$t('common.fields.agreeNumber')">
      <CustomAutocomplete
        v-model="filters.agreementID"
        :filterResult="filteredagreementID"
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
  </AdvancedFiltersBase>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { mapGetters } from 'vuex'
import localFiltersMixin from '@/mixins/localFiltersMixin.js'

export default {
  mixins: [localFiltersMixin],
  data() {
    return {
      autocompletes: ['agreementID', 'csi', 'numberOfLicenses'],
      selects: ['type'],
    }
  },
  created() {
    this.fullData = this.returnLicensesAgreement('mysql')

    bus.$on('onTabChange', () => this.reset())
  },
  computed: {
    ...mapGetters(['returnLicensesAgreement']),
  },
}
</script>

<style lang="scss" scoped></style>
