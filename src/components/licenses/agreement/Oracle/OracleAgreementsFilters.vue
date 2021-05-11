<template>
  <AdvancedFiltersBase :submitAction="apply">
    <CustomField label="Agreement Number">
      <b-autocomplete
        v-model="filters.agreementID"
        size="is-small"
        clearable
        :data="filteredData"
        @typing="
          setFilteredAutocomplete(
            $event,
            'agreementID',
            returnLicensesAgreement('oracle')
          )
        "
      />
    </CustomField>

    <CustomField label="Part Number">
      <b-select
        v-model="filters.licenseTypeID"
        size="is-small"
        placeholder="Select a Part Number"
        expanded
      >
        <option :value="null" v-if="filters.licenseTypeID">
          Reset
        </option>
        <option v-for="(part, index) in filteredLicenseTypeID" :key="index">
          {{ part }}
        </option>
      </b-select>
    </CustomField>

    <CustomField label="Description">
      <b-select
        v-model="filters.itemDescription"
        size="is-small"
        placeholder="Select a Description"
        expanded
      >
        <option :value="null" v-if="filters.itemDescription">
          Reset
        </option>
        <option v-for="(desc, index) in filteredItemDescription" :key="index">
          {{ desc }}
        </option>
      </b-select>
    </CustomField>

    <CustomField label="Metric">
      <b-select
        v-model="filters.metric"
        size="is-small"
        placeholder="Select a Metric"
        expanded
      >
        <option :value="null" v-if="filters.metric">
          Reset
        </option>
        <option v-for="(met, index) in filteredMetric" :key="index">
          {{ met }}
        </option>
      </b-select>
    </CustomField>

    <CustomField label="CSI">
      <b-autocomplete
        v-model="filters.csi"
        size="is-small"
        clearable
        :data="filteredData"
        @typing="
          setFilteredAutocomplete(
            $event,
            'csi',
            returnLicensesAgreement('oracle')
          )
        "
      />
    </CustomField>

    <CustomField label="Reference Number">
      <b-autocomplete
        v-model="filters.referenceNumber"
        size="is-small"
        clearable
        :data="filteredData"
        @typing="
          setFilteredAutocomplete(
            $event,
            'referenceNumber',
            returnLicensesAgreement('oracle')
          )
        "
      />
    </CustomField>

    <CustomField label="ULA">
      <div class="is-flex" style="justify-content: space-around;">
        <b-radio
          size="is-small"
          v-model="filters.unlimited"
          native-value="true"
        >
          Yes
        </b-radio>
        <b-radio
          size="is-small"
          v-model="filters.unlimited"
          native-value="false"
        >
          No
        </b-radio>
        <b-radio size="is-small" v-model="filters.unlimited" native-value="">
          All
        </b-radio>
      </div>
    </CustomField>

    <CustomField label="Number Licenses">
      <b-slider
        v-model="filters.licensesCount"
        :min="minlicensesCount"
        :max="maxlicensesCount"
      >
        <b-slider-tick :value="minlicensesCount">
          {{ minlicensesCount }}
        </b-slider-tick>
        <b-slider-tick :value="maxlicensesCount">
          {{ maxlicensesCount }}
        </b-slider-tick>
      </b-slider>
    </CustomField>

    <CustomField label="Number User">
      <b-slider
        v-model="filters.usersCount"
        :min="minusersCount"
        :max="maxusersCount"
      >
        <b-slider-tick :value="minusersCount">
          {{ minusersCount }}
        </b-slider-tick>
        <b-slider-tick :value="maxusersCount">
          {{ maxusersCount }}
        </b-slider-tick>
      </b-slider>
    </CustomField>

    <CustomField label="Number Available">
      <b-slider
        v-model="filters.availableCount"
        :min="minavailableCount"
        :max="maxavailableCount"
      >
        <b-slider-tick :value="minavailableCount">
          {{ minavailableCount }}
        </b-slider-tick>
        <b-slider-tick :value="maxavailableCount">
          {{ maxavailableCount }}
        </b-slider-tick>
      </b-slider>
    </CustomField>

    <CustomField label="Basket">
      <div class="is-flex" style="justify-content: space-around;">
        <b-radio size="is-small" v-model="filters.catchAll" native-value="true">
          Yes
        </b-radio>
        <b-radio
          size="is-small"
          v-model="filters.catchAll"
          native-value="false"
        >
          No
        </b-radio>
        <b-radio size="is-small" v-model="filters.catchAll" native-value="">
          All
        </b-radio>
      </div>
    </CustomField>

    <CustomField label="Restricted">
      <div class="is-flex" style="justify-content: space-around;">
        <b-radio
          size="is-small"
          v-model="filters.restricted"
          native-value="true"
        >
          Yes
        </b-radio>
        <b-radio
          size="is-small"
          v-model="filters.restricted"
          native-value="false"
        >
          No
        </b-radio>
        <b-radio size="is-small" v-model="filters.restricted" native-value="">
          All
        </b-radio>
      </div>
    </CustomField>
  </AdvancedFiltersBase>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { mapGetters } from 'vuex'
import { prepareDataForAutocomplete } from '@/helpers/helpers.js'
import localFiltersMixin from '@/mixins/localFiltersMixin.js'
import AdvancedFiltersBase from '@/components/common/AdvancedFiltersBase.vue'
import CustomField from '@/components/common/Form/CustomField.vue'

export default {
  mixins: [localFiltersMixin],
  components: {
    AdvancedFiltersBase,
    CustomField
  },
  data() {
    return {
      filteredLicenseTypeID: [],
      filteredItemDescription: [],
      filteredMetric: [],
      filters: {
        unlimited: '',
        catchAll: '',
        restricted: ''
      }
    }
  },
  beforeMount() {
    this.setAutocomplete()
    this.setSlider()

    bus.$on('onResetAction', () => this.reset(this.resetFilters))
    bus.$on('onTabChange', () => this.reset(this.resetFilters))
  },
  methods: {
    resetFilters() {
      this.filters = {
        unlimited: '',
        catchAll: '',
        restricted: ''
      }
      this.setSlider()
    },
    setAutocomplete() {
      this.filteredLicenseTypeID = prepareDataForAutocomplete(
        this.returnLicensesAgreement('oracle'),
        'licenseTypeID'
      )
      this.filteredItemDescription = prepareDataForAutocomplete(
        this.returnLicensesAgreement('oracle'),
        'itemDescription'
      )
      this.filteredMetric = prepareDataForAutocomplete(
        this.returnLicensesAgreement('oracle'),
        'metric'
      )
    },
    setSlider() {
      this.setSliderFilterConfig(
        'licensesCount',
        this.returnLicensesAgreement('oracle')
      )
      this.setSliderFilterConfig(
        'usersCount',
        this.returnLicensesAgreement('oracle')
      )
      this.setSliderFilterConfig(
        'availableCount',
        this.returnLicensesAgreement('oracle')
      )
    }
  },
  computed: {
    ...mapGetters(['returnLicensesAgreement'])
  }
}
</script>

<style lang="scss" scoped></style>
