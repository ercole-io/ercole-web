<template>
  <AdvancedFiltersBase :submitAction="apply">
    <CustomField label="Agreement Number">
      <CustomAutocomplete
        v-model="filters.agreementID"
        :filterResult="filteredagreementID"
        :filterMethod="setAutocompletes"
      />
    </CustomField>

    <CustomField label="Part Number">
      <CustomSelect
        v-model="filters.licenseTypeID"
        :options="filteredlicenseTypeID"
      />
    </CustomField>

    <CustomField label="Description">
      <CustomSelect
        v-model="filters.itemDescription"
        :options="filtereditemDescription"
      />
    </CustomField>

    <CustomField label="Metric">
      <CustomSelect v-model="filters.metric" :options="filteredmetric" />
    </CustomField>

    <CustomField label="CSI">
      <CustomAutocomplete
        v-model="filters.csi"
        :filterResult="filteredcsi"
        :filterMethod="setAutocompletes"
      />
    </CustomField>

    <CustomField label="Reference Number">
      <CustomAutocomplete
        v-model="filters.referenceNumber"
        :filterResult="filteredreferenceNumber"
        :filterMethod="setAutocompletes"
        v-if="toggleReferenceNumber"
      />
    </CustomField>

    <CustomField label="ULA">
      <CustomRadio v-model="filters.unlimited" />
    </CustomField>

    <CustomField label="Licenses Core">
      <CustomSlider
        v-model="filters.licensesCount"
        :ticks="[minlicensesCount, maxlicensesCount]"
      />
    </CustomField>

    <CustomField label="Licenses User">
      <CustomSlider
        v-model="filters.usersCount"
        :ticks="[minusersCount, maxusersCount]"
      />
    </CustomField>

    <CustomField label="Number Available">
      <CustomSlider
        v-model="filters.availableCount"
        :ticks="[minavailableCount, maxavailableCount]"
      />
    </CustomField>

    <CustomField label="Basket">
      <CustomRadio v-model="filters.catchAll" />
    </CustomField>

    <CustomField label="Restricted">
      <CustomRadio v-model="filters.restricted" />
    </CustomField>
  </AdvancedFiltersBase>
</template>

<script>
import _ from 'lodash'
import { bus } from '@/helpers/eventBus.js'
import { mapGetters } from 'vuex'
import localFiltersMixin from '@/mixins/localFiltersMixin.js'

export default {
  mixins: [localFiltersMixin],
  data() {
    return {
      autocompletes: ['agreementID', 'csi'],
      selects: [
        'licenseTypeID',
        'itemDescription',
        'metric',
        'referenceNumber'
      ],
      sliders: ['licensesCount', 'usersCount', 'availableCount'],
      filters: {
        unlimited: '',
        catchAll: '',
        restricted: ''
      }
    }
  },
  created() {
    this.fullData = this.returnLicensesAgreement('oracle')

    bus.$on('onTabChange', () => this.reset(this.resetFilters))
  },
  methods: {
    resetFilters() {
      this.filters = {
        unlimited: '',
        catchAll: '',
        restricted: ''
      }
    }
  },
  computed: {
    ...mapGetters(['returnLicensesAgreement']),
    toggleReferenceNumber() {
      return _.some(this.returnLicensesAgreement('oracle'), 'referenceNumber')
    }
  }
}
</script>

<style lang="scss" scoped></style>
