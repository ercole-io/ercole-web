<template>
  <AdvancedFiltersBase :submitAction="apply">
    <CustomField :label="$t('common.fields.fullAgreement')">
      <CustomSelectAutocomplete
        v-model="filters.fullPartNumber"
        :filterResult="filteredfullPartNumber"
        :filterMethod="setAutocompletes"
        field="fullPartNumber"
      />
    </CustomField>

    <CustomField :label="$t('common.fields.consumed')">
      <CustomSlider
        v-model="filters.consumed"
        :ticks="[minconsumed, maxconsumed]"
      />
    </CustomField>

    <CustomField :label="$t('common.fields.covered')">
      <CustomSlider
        v-model="filters.covered"
        :ticks="[mincovered, maxcovered]"
      />
    </CustomField>

    <CustomField :label="$t('common.fields.compliance')">
      <CustomSlider v-model="filters.compliance" percent />
    </CustomField>

    <CustomField :label="$t('common.fields.ula')">
      <CustomRadio v-model="filters.unlimited" />
    </CustomField>
  </AdvancedFiltersBase>
</template>

<script>
import { mapGetters } from 'vuex'
import localFiltersMixin from '@/mixins/localFiltersMixin.js'
import CustomSelectAutocomplete from '@/components/common/Form/CustomSelectAutocomplete.vue'

export default {
  mixins: [localFiltersMixin],
  components: {
    CustomSelectAutocomplete
  },
  data() {
    return {
      autocompletes: ['fullPartNumber'],
      sliders: ['consumed', 'covered', 'compliance', 'licenseAvailable'],
      filters: {
        unlimited: ''
      }
    }
  },
  created() {
    this.fullData = this.getLicensesCompliance
  },
  methods: {
    resetFilters() {
      this.filters = {
        unlimited: ''
      }
    }
  },
  computed: {
    ...mapGetters(['getLicensesCompliance'])
  }
}
</script>

<style lang="scss" scoped></style>
