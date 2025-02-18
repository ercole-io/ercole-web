<template>
  <AdvancedFiltersBase :submitAction="apply">
    <Collapse :collapses="collapses">
      <template slot="General">
        <CustomField :label="$t('common.fields.hostname')">
          <CustomAutocomplete
            v-model="filters.hostname"
            :filterResult="filteredhostname"
            :filterMethod="setAutocompletes"
          />
        </CustomField>

        <CustomField :label="$t('common.fields.dbs')">
          <CustomAutocomplete
            v-model="filters.databases"
            :filterResult="filtereddatabases"
            :filterMethod="setAutocompletes"
          />
        </CustomField>

        <CustomField label="Disk Group Name">
          <CustomAutocomplete
            v-model="filters.diskGroupName"
            :filterResult="filtereddiskGroupName"
            :filterMethod="setAutocompletes"
          />
        </CustomField>

        <CustomField label="Total Space">
          <CustomSlider
            v-model="filters.totalSpace"
            :ticks="[mintotalSpace, maxtotalSpace]"
          />
        </CustomField>

        <CustomField label="Used Space">
          <CustomSlider
            v-model="filters.usedSpace"
            :ticks="[minusedSpace, maxusedSpace]"
          />
        </CustomField>

        <CustomField label="Free Space">
          <CustomSlider
            v-model="filters.freeSpace"
            :ticks="[minfreeSpace, maxfreeSpace]"
          />
        </CustomField>
      </template>
    </Collapse>

    <slot />
  </AdvancedFiltersBase>
</template>

<script>
import localFiltersMixin from '@/mixins/localFiltersMixin.js'
import Collapse from '@/components/common/Collapse.vue'

export default {
  name: 'databases-oracle-disk-groups-filters-component',
  mixins: [localFiltersMixin],
  components: {
    Collapse,
  },
  data() {
    return {
      collapses: ['General'],
      autocompletes: ['hostname', 'databases', 'diskGroupName'],
      sliders: ['totalSpace', 'usedSpace', 'freeSpace'],
    }
  },
}
</script>

<style lang="scss" scoped></style>
