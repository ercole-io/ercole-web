<template>
  <AdvancedFiltersBase :submitAction="apply">
    <CustomField :label="$t('common.fields.agreeNumber')">
      <CustomAutocomplete
        v-model="filters.agreementID"
        :filterResult="filteredagreementID"
        :filterMethod="setAutocompletes"
      />
    </CustomField>

    <CustomField :label="$t('common.fields.partNumber')">
      <CustomSelect
        v-model="filters.licenseTypeID"
        :options="filteredlicenseTypeID"
      />
    </CustomField>

    <CustomField :label="$t('common.fields.description')">
      <CustomSelect
        v-model="filters.itemDescription"
        :options="filtereditemDescription"
      />
    </CustomField>

    <CustomField :label="$t('common.fields.metric')">
      <CustomSelect v-model="filters.metric" :options="filteredmetric" />
    </CustomField>

    <CustomField :label="$t('common.fields.csi')">
      <CustomAutocomplete
        v-model="filters.csi"
        :filterResult="filteredcsi"
        :filterMethod="setAutocompletes"
      />
    </CustomField>

    <CustomField :label="$t('common.fields.refNumber')">
      <CustomAutocomplete
        v-model="filters.referenceNumber"
        :filterResult="filteredreferenceNumber"
        :filterMethod="setAutocompletes"
        v-if="toggleReferenceNumber"
      />
    </CustomField>

    <CustomField :label="$t('common.fields.ula')">
      <CustomRadio v-model="filters.unlimited" />
    </CustomField>

    <CustomField :label="$t('common.fields.licPerCore')">
      <CustomSlider
        v-model="filters.licensesPerCore"
        :ticks="[minlicensesPerCore, maxlicensesPerCore]"
        :steps="1"
      />
    </CustomField>

    <CustomField :label="$t('common.fields.licPerUser')">
      <CustomSlider
        v-model="filters.licensesPerUser"
        :ticks="[minlicensesPerUser, maxlicensesPerUser]"
        :steps="1"
      />
    </CustomField>

    <CustomField :label="$t('common.fields.avLicPerCore')">
      <CustomSlider
        v-model="filters.availableLicensesPerCore"
        :ticks="[minavailableLicensesPerCore, maxavailableLicensesPerCore]"
        :steps="1"
      />
    </CustomField>

    <CustomField :label="$t('common.fields.avLicPerUser')">
      <CustomSlider
        v-model="filters.availableLicensesPerUser"
        :ticks="[minavailableLicensesPerUser, maxavailableLicensesPerUser]"
        :steps="1"
      />
    </CustomField>

    <CustomField :label="$t('common.fields.basket')">
      <CustomRadio v-model="filters.catchAll" />
    </CustomField>

    <CustomField :label="$t('common.fields.restricted')">
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
      autocompletes: ['agreementID', 'csi', 'referenceNumber'],
      selects: [
        'licenseTypeID',
        'itemDescription',
        'metric',
        'referenceNumber'
      ],
      sliders: [
        'licensesPerCore',
        'licensesPerUser',
        'availableLicensesPerCore',
        'availableLicensesPerUser'
      ],
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
