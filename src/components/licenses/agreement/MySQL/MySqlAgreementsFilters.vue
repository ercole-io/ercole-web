<template>
  <AdvancedFiltersBase :submitAction="apply">
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

    <slot />
  </AdvancedFiltersBase>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import localFiltersMixin from '@/mixins/localFiltersMixin.js'
import { mapGetters } from 'vuex'

export default {
  mixins: [localFiltersMixin],
  data() {
    return {
      autocompletes: ['agreementID', 'csi', 'numberOfLicenses'],
      selects: ['type'],
    }
  },
  created() {
    bus.$on('onTabChange', () => {
      this.reset()
      bus.$emit('data', this.returnLicensesAgreement('mysql'))
    })
  },
  computed: {
    ...mapGetters(['returnLicensesAgreement']),
  },
}
</script>

<style lang="scss" scoped></style>
