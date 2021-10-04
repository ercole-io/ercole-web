<template>
  <AdvancedFiltersBase :submitAction="apply">
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

    <!-- <CustomField :label="$t('common.fields.licAvailable')">
      <CustomSlider
        v-model="filters.licenseAvailable"
        :ticks="[minlicenseAvailable, maxlicenseAvailable]"
      />
    </CustomField> -->

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

export default {
  mixins: [localFiltersMixin],
  data() {
    return {
      selects: ['licenseTypeID', 'itemDescription', 'metric'],
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
