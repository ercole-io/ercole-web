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
        <option v-for="(type, index) in filteredtype" :key="index">
          {{ type | toLower }}
        </option>
      </b-select>
    </CustomField>

    <CustomField label="Agreement Number">
      <b-autocomplete
        v-model="filters.agreementID"
        size="is-small"
        clearable
        :data="filteredagreementID"
        @typing="setAutocompletes($event)"
      />
    </CustomField>

    <CustomField label="CSI">
      <b-autocomplete
        v-model="filters.csi"
        size="is-small"
        clearable
        :data="filteredcsi"
        @typing="setAutocompletes($event, 'csi')"
      />
    </CustomField>

    <CustomField label="Number of licenses">
      <b-autocomplete
        v-model="filters.numberOfLicenses"
        size="is-small"
        clearable
        :data="filterednumberOfLicenses"
        @typing="setAutocompletes($event)"
      />
    </CustomField>
  </AdvancedFiltersBase>
</template>

<script>
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
      autocompletes: ['agreementID', 'csi', 'numberOfLicenses'],
      selects: ['type']
    }
  },
  created() {
    this.fullData = this.returnLicensesAgreement('mysql')

    bus.$on('onResetAction', () => this.reset())
    bus.$on('onTabChange', () => this.reset())
  },
  computed: {
    ...mapGetters(['returnLicensesAgreement'])
  }
}
</script>

<style lang="scss" scoped></style>
