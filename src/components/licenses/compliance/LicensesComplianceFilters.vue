<template>
  <AdvancedFiltersBase :submitAction="apply" setMinHeight="560">
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

    <CustomField :label="$t('common.collumns.licAvailable')">
      <CustomSlider
        v-model="filters.available"
        :ticks="[minavailable, maxavailable]"
        :steps="1"
      />
    </CustomField>

    <CustomField :label="$t('common.fields.purchased')">
      <CustomSlider
        v-model="filters.purchased"
        :ticks="[minpurchased, maxpurchased]"
        :steps="1"
      />
    </CustomField>

    <CustomField :label="$t('common.fields.consumed')">
      <CustomSlider
        v-model="filters.consumed"
        :ticks="[minconsumed, maxconsumed]"
        :steps="1"
      />
    </CustomField>

    <CustomField :label="$t('common.fields.covered')">
      <CustomSlider
        v-model="filters.covered"
        :ticks="[mincovered, maxcovered]"
        :steps="1"
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
    CustomSelectAutocomplete,
  },
  data() {
    return {
      autocompletes: ['fullPartNumber', 'metric'],
      sliders: [
        'consumed',
        'covered',
        'compliance',
        'licenseAvailable',
        'purchased',
        'available',
      ],
      filters: {
        unlimited: '',
      },
    }
  },
  created() {
    this.fullData = this.getLicensesCompliance
  },
  methods: {
    resetFilters() {
      this.filters = {
        unlimited: '',
      }
    },
  },
  computed: {
    ...mapGetters(['getLicensesCompliance']),
  },
}
</script>

<style lang="scss" scoped></style>
