<template>
  <AdvancedFiltersBase :submitAction="apply">
    <CustomField label="Agreement Number">
      <b-autocomplete
        v-model="filters.agreementID"
        size="is-small"
        clearable
        :data="filteredagreementID"
        @typing="setAutocompletes($event)"
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
        <option v-for="(part, index) in filteredlicenseTypeID" :key="index">
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
        <option v-for="(desc, index) in filtereditemDescription" :key="index">
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
        <option v-for="(met, index) in filteredmetric" :key="index">
          {{ met }}
        </option>
      </b-select>
    </CustomField>

    <CustomField label="CSI">
      <b-autocomplete
        v-model="filters.csi"
        size="is-small"
        clearable
        :data="filteredcsi"
        @typing="setAutocompletes($event)"
      />
    </CustomField>

    <CustomField label="Reference Number" v-if="hideReferenceNumberColumn">
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

    <CustomField label="Licenses Core">
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

    <CustomField label="Licenses User">
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
import _ from 'lodash'
import { bus } from '@/helpers/eventBus.js'
import { mapGetters } from 'vuex'
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
      autocompletes: ['agreementID', 'csi'],
      selects: ['licenseTypeID', 'itemDescription', 'metric'],
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
    }
  },
  computed: {
    ...mapGetters(['returnLicensesAgreement']),
    hideReferenceNumberColumn() {
      return _.some(this.returnLicensesAgreement('oracle'), 'referenceNumber')
    }
  }
}
</script>

<style lang="scss" scoped></style>
