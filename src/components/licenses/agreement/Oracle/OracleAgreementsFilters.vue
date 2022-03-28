<template>
  <AdvancedFiltersBase :submitAction="apply">
    <Collapse :collapses="collapses">
      <template slot="General">
        <CustomField :label="$t('common.fields.agreeNumber')">
          <CustomAutocomplete
            v-model="filters.agreementID"
            :filterResult="filteredagreementID"
            :filterMethod="setAutocompletes"
          />
        </CustomField>

        <CustomField :label="$t('common.fields.fullAgreement')">
          <CustomSelectAutocomplete
            v-model="filters.fullPartNumber"
            :filterResult="filteredfullPartNumber"
            :filterMethod="setAutocompletes"
            field="fullPartNumber"
          />
        </CustomField>

        <CustomField :label="$t('common.fields.metric')">
          <CustomAutocomplete
            v-model="filters.metric"
            :filterResult="filteredmetric"
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
          <CustomRadio v-model="filters.basket" />
        </CustomField>

        <CustomField :label="$t('common.fields.restricted')">
          <CustomRadio v-model="filters.restricted" />
        </CustomField>
      </template>
    </Collapse>

    <slot />
  </AdvancedFiltersBase>
</template>

<script>
import _ from 'lodash'
import { bus } from '@/helpers/eventBus.js'
import { mapGetters } from 'vuex'
import localFiltersMixin from '@/mixins/localFiltersMixin.js'
import CustomSelectAutocomplete from '@/components/common/Form/CustomSelectAutocomplete.vue'
import Collapse from '@/components/common/Collapse.vue'

export default {
  mixins: [localFiltersMixin],
  components: {
    CustomSelectAutocomplete,
    Collapse,
  },
  data() {
    return {
      collapses: ['General'],
      autocompletes: [
        'agreementID',
        'csi',
        'referenceNumber',
        'fullPartNumber',
        'metric',
      ],
      selects: ['referenceNumber'],
      sliders: [
        'licensesPerCore',
        'licensesPerUser',
        'availableLicensesPerCore',
        'availableLicensesPerUser',
      ],
      filters: {
        unlimited: '',
        basket: '',
        restricted: '',
      },
    }
  },
  created() {
    bus.$on('onTabChange', () => {
      this.reset(this.resetFilters)
      bus.$emit('data', this.returnLicensesAgreement('oracle'))
    })
  },
  methods: {
    resetFilters() {
      this.filters = {
        unlimited: '',
        basket: '',
        restricted: '',
      }
    },
  },
  computed: {
    ...mapGetters(['returnLicensesAgreement']),
    toggleReferenceNumber() {
      return _.some(this.returnLicensesAgreement('oracle'), 'referenceNumber')
    },
  },
}
</script>

<style lang="scss" scoped></style>
