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
        <option v-for="(type, index) in filteredType" :key="index">
          {{ type }}
        </option>
      </b-select>
    </CustomField>

    <!-- <CustomField label="Agreement Number">
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
    </CustomField> -->

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
    }
  },
  beforeMount() {
    this.filteredType = prepareDataForAutocomplete(
      this.returnLicensesAgreement('mysql'),
      'type'
    )

    bus.$on('onResetAction', () => this.reset())
    bus.$on('onTabChange', () => this.reset())
  },
  computed: {
    ...mapGetters(['returnLicensesAgreement'])
  }
}
</script>

<style lang="scss" scoped></style>
