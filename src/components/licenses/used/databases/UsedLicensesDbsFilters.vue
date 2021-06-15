<template>
  <AdvancedFiltersBase :submitAction="apply">
    <CustomField label="Hostname">
      <CustomAutocomplete
        v-model="filters.hostname"
        :filterResult="filteredhostname"
        :filterMethod="setAutocompletes"
      />
    </CustomField>

    <CustomField label="DB Name">
      <CustomAutocomplete
        v-model="filters.dbName"
        :filterResult="filtereddbName"
        :filterMethod="setAutocompletes"
      />
    </CustomField>

    <CustomField label="Part Number">
      <CustomSelect
        v-model="filters.licenseTypeID"
        :options="filteredlicenseTypeID"
      />
    </CustomField>

    <CustomField label="Description">
      <CustomSelect
        v-model="filters.description"
        :options="filtereddescription"
      />
    </CustomField>

    <CustomField label="Metric">
      <CustomSelect v-model="filters.metric" :options="filteredmetric" />
    </CustomField>

    <CustomField label="Used Licenses">
      <CustomSlider
        v-model="filters.usedLicenses"
        :ticks="[minusedLicenses, maxusedLicenses]"
      />
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
      autocompletes: ['hostname', 'dbName'],
      selects: ['licenseTypeID', 'description', 'metric'],
      sliders: ['usedLicenses']
    }
  },
  created() {
    this.fullData = this.getUsedLicensesByDbs

    bus.$on('onUsedTabChange', () => this.reset(this.resetFilters))
  },
  computed: {
    ...mapGetters(['getUsedLicensesByDbs'])
  }
}
</script>

<style lang="scss" scoped></style>
