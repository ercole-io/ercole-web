<template>
  <AdvancedFiltersBase :submitAction="apply">
    <CustomField label="Type">
      <b-select
        v-model="filters.type"
        size="is-small"
        placeholder="Select a Type"
        expanded
      >
        <option :value="null" v-if="filters.type">
          Reset
        </option>
        <option v-for="(part, index) in filteredType" :key="index">
          {{ part }}
        </option>
      </b-select>
    </CustomField>

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
            returnLicensesAgreement('mysql')
          )
        "
      />
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
            returnLicensesAgreement('mysql')
          )
        "
      />
    </CustomField>

    <CustomField label="Number of licenses">
      <b-autocomplete
        v-model="filters.numberOfLicenses"
        size="is-small"
        clearable
        :data="filteredData"
        @typing="
          setFilteredAutocomplete(
            $event,
            'numberOfLicenses',
            returnLicensesAgreement('mysql')
          )
        "
      />
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
      filteredType: []
      // filteredItemDescription: [],
      // filteredMetric: [],
      // filters: {
      //   unlimited: '',
      //   catchAll: '',
      //   restricted: ''
      // }
    }
  },
  beforeMount() {
    this.setAutocomplete()
    this.setSlider()

    bus.$on('onResetAction', () => this.reset(this.resetFilters))
  },
  methods: {
    resetFilters() {
      // this.filters = {
      //   unlimited: '',
      //   catchAll: '',
      //   restricted: ''
      // }
      this.setSlider()
    },
    setAutocomplete() {
      this.filteredType = prepareDataForAutocomplete(
        this.returnLicensesAgreement('mysql'),
        'type'
      )
      // this.filteredItemDescription = prepareDataForAutocomplete(
      //   this.returnLicensesAgreement('mysql'),
      //   'itemDescription'
      // )
      // this.filteredMetric = prepareDataForAutocomplete(
      //   this.returnLicensesAgreement('mysql'),
      //   'metric'
      // )
    },
    setSlider() {
      // this.setSliderFilterConfig(
      //   'licensesCount',
      //   this.returnLicensesAgreement('mysql')
      // )
      // this.setSliderFilterConfig(
      //   'usersCount',
      //   this.returnLicensesAgreement('mysql')
      // )
      // this.setSliderFilterConfig(
      //   'availableCount',
      //   this.returnLicensesAgreement('mysql')
      // )
    }
  },
  computed: {
    ...mapGetters(['returnLicensesAgreement'])
  }
}
</script>

<style lang="scss" scoped></style>
