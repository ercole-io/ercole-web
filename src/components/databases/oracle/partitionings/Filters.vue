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
            v-model="filters.databaseName"
            :filterResult="filtereddatabaseName"
            :filterMethod="setAutocompletes"
          />
        </CustomField>

        <CustomField label="PDB">
          <CustomSelect v-model="filters.pdb" :options="filteredpdb" />
        </CustomField>

        <CustomField label="Segment Name">
          <CustomSelect
            v-model="filters.segmentName"
            :options="filteredsegmentName"
          />
        </CustomField>

        <CustomField label="Segment Qwner">
          <CustomSelect v-model="filters.owner" :options="filteredowner" />
        </CustomField>

        <CustomField label="Segment Type">
          <CustomSelect
            v-model="filters.segmentType"
            :options="filteredsegmentType"
          />
        </CustomField>

        <CustomField label="Partition Name">
          <CustomAutocomplete
            v-model="filters.partitionName"
            :filterResult="filteredpartitionName"
            :filterMethod="setAutocompletes"
          />
        </CustomField>

        <CustomField label="MB">
          <CustomSlider
            v-model="filters.mb"
            :ticks="[minmb, maxmb]"
            :steps="0.11"
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
  name: 'partitionings-filters',
  mixins: [localFiltersMixin],
  components: {
    Collapse,
  },
  data() {
    return {
      collapses: ['General'],
      autocompletes: ['hostname', 'databaseName', 'partitionName'],
      selects: ['pdb', 'segmentName', 'segmentType', 'owner'],
      sliders: ['mb'],
    }
  },
}
</script>

<style lang="scss" scoped></style>
