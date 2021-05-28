<template>
  <AdvancedFiltersBase :submitAction="apply">
    <CustomField label="Cluster Name">
      <CustomAutocomplete
        v-model="filters.name"
        :filterResult="filteredname"
        :filterMethod="setAutocompletes"
      />
    </CustomField>

    <CustomField label="Type">
      <CustomSelect v-model="filters.type" :options="filteredtype" />
    </CustomField>

    <CustomField label="Core">
      <CustomSlider
        v-model="filters.cpu"
        :ticks="[mincpu, maxcpu]"
        :steps="1"
      />
    </CustomField>

    <CustomField label="Socket">
      <CustomSlider v-model="filters.sockets" :ticks="filteredsockets" marks />
    </CustomField>

    <CustomField label="Physical Host">
      <CustomAutocomplete
        v-model="filters.virtualizationNodes"
        :filterResult="filteredvirtualizationNodes"
        :filterMethod="setAutocompletes"
      />
    </CustomField>

    <CustomField label="Total VM">
      <CustomSlider
        v-model="filters.vmsCount"
        :ticks="[minvmsCount, maxvmsCount]"
        :steps="1"
      />
    </CustomField>

    <CustomField label="Total VM Ercole">
      <CustomSlider
        v-model="filters.vmsErcoleAgentCount"
        :ticks="[minvmsErcoleAgentCount, maxvmsErcoleAgentCount]"
        :steps="1"
      />
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
      autocompletes: ['name', 'virtualizationNodes'],
      selects: ['type'],
      sliders: ['cpu', 'sockets', 'vmsCount', 'vmsErcoleAgentCount']
    }
  },
  created() {
    this.fullData = this.getHypervisors
  },
  computed: {
    ...mapGetters(['getHypervisors'])
  }
}
</script>

<style lang="scss" scoped></style>
