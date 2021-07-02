<template>
  <AdvancedFiltersBase :submitAction="apply">
    <CustomField :label="$t('common.fields.hostname')">
      <CustomAutocomplete
        v-model="filters.hostname"
        :filterResult="filteredhostname"
        :filterMethod="setAutocompletes"
      />
    </CustomField>

    <CustomField :label="$t('common.fields.dbs')">
      <CustomSlider
        v-model="filters.dbsQty"
        :ticks="[mindbsQty, maxdbsQty]"
        :steps="1"
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
        v-model="filters.description"
        :options="filtereddescription"
      />
    </CustomField>

    <CustomField :label="$t('common.fields.metric')">
      <CustomSelect v-model="filters.metric" :options="filteredmetric" />
    </CustomField>
  </AdvancedFiltersBase>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { mapGetters } from 'vuex'
import localFiltersMixin from '@/mixins/localFiltersMixin.js'

export default {
  mixins: [localFiltersMixin],
  data() {
    return {
      autocompletes: ['hostname'],
      selects: ['licenseTypeID', 'description', 'metric'],
      sliders: ['dbsQty']
    }
  },
  created() {
    this.fullData = this.getUsedLicensesByHost

    bus.$on('onUsedTabChange', () => this.reset(this.resetFilters))
  },
  computed: {
    ...mapGetters(['getUsedLicensesByHost'])
  }
}
</script>

<style lang="scss" scoped></style>
