<template>
  <AdvancedFiltersBase :submitAction="apply" setMinHeight="560">
    <Collapse :collapses="collapses">
      <template slot="General">
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
      </template>
    </Collapse>
  </AdvancedFiltersBase>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
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
