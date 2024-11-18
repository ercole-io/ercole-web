<template>
  <AdvancedFiltersBase :submitAction="apply">
    <Collapse :collapses="collapses">
      <template slot="General">
        <CustomField label="DB Name">
          <CustomAutocomplete
            v-model="filters.dbName"
            :filterResult="filtereddbName"
            :filterMethod="setAutocompletes"
          />
        </CustomField>

        <CustomField label="DB Instance Class">
          <CustomAutocomplete
            v-model="filters.dbInstanceClass"
            :filterResult="filtereddbInstanceClass"
            :filterMethod="setAutocompletes"
          />
        </CustomField>

        <CustomField label="Engine">
          <CustomAutocomplete
            v-model="filters.engine"
            :filterResult="filteredengine"
            :filterMethod="setAutocompletes"
          />
        </CustomField>

        <CustomField label="Engine Version">
          <CustomSelect
            v-model="filters.engineVersion"
            :options="filteredengineVersion"
          />
        </CustomField>

        <CustomField label="DB Instance Status">
          <CustomSelect
            v-model="filters.dbInstanceStatus"
            :options="filtereddbInstanceStatus"
          />
        </CustomField>

        <CustomField label="License Model">
          <CustomSelect
            v-model="filters.licenseModel"
            :options="filteredlicenseModel"
          />
        </CustomField>

        <CustomField label="Standard licenses Used">
          <CustomSlider
            v-model="filters.standardCount"
            :ticks="[minstandardCount, maxstandardCount]"
            :steps="0"
          />
        </CustomField>

        <CustomField label="Enterprise licenses Used">
          <CustomSlider
            v-model="filters.enterpriseCount"
            :ticks="[minenterpriseCount, maxenterpriseCount]"
            :steps="0"
          />
        </CustomField>

        <CustomField label="Storage Type">
          <CustomSelect
            v-model="filters.storageType"
            :options="filteredstorageType"
          />
        </CustomField>

        <CustomField label="Allocated Storage">
          <CustomSlider
            v-model="filters.allocatedStorage"
            :ticks="[minallocatedStorage, maxallocatedStorage]"
            :steps="0.0"
          />
        </CustomField>

        <CustomField label="Max Allocated Storage">
          <CustomSlider
            v-model="filters.maxAllocatedStorage"
            :ticks="[minmaxAllocatedStorage, maxmaxAllocatedStorage]"
            :steps="0.0"
          />
        </CustomField>

        <CustomField label="Instance Type">
          <CustomSelect
            v-model="filters.instanceType"
            :options="filteredinstanceType"
          />
        </CustomField>

        <CustomField label="Processor Manu facturer">
          <CustomSelect
            v-model="filters.processorManufacturer"
            :options="filteredprocessorManufacturer"
          />
        </CustomField>

        <CustomField label="Default Core">
          <CustomSlider
            v-model="filters.defaultCore"
            :ticks="[mindefaultCore, maxdefaultCore]"
            :steps="0.0"
          />
        </CustomField>

        <CustomField label="Default Threads Per Core">
          <CustomSlider
            v-model="filters.defaultThreadsPerCore"
            :ticks="[mindefaultThreadsPerCore, maxdefaultThreadsPerCore]"
            :steps="0.0"
          />
        </CustomField>

        <CustomField label="Default VCpus">
          <CustomSlider
            v-model="filters.defaultVCpus"
            :ticks="[mindefaultVCpus, maxdefaultVCpus]"
            :steps="0.0"
          />
        </CustomField>

        <CustomField label="Memory Size In Mib">
          <CustomSlider
            v-model="filters.memorySizeInMib"
            :ticks="[minmemorySizeInMib, maxmemorySizeInMib]"
            :steps="0.0"
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
  name: 'databases-oracle-awsrds-filters-component',
  mixins: [localFiltersMixin],
  components: {
    Collapse,
  },
  data() {
    return {
      collapses: ['General'],
      autocompletes: ['dbName', 'dbInstanceClass', 'engine'],
      selects: [
        'engineVersion',
        'dbInstanceStatus',
        'licenseModel',
        'storageType',
        'instanceType',
      ],
      sliders: [
        'allocatedStorage',
        'maxAllocatedStorage',
        'defaultCore',
        'defaultThreadsPerCore',
        'defaultVCpus',
        'memorySizeInMib',
        'standardCount',
        'enterpriseCount',
      ],
    }
  },
}
</script>

<style lang="scss" scoped></style>
