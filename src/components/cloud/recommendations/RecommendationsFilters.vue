<template>
  <AdvancedFiltersBase :submitAction="apply">
    <CustomField label="Recommendation">
      <CustomAutocomplete
        v-model="filters.name"
        :filterResult="filteredname"
        :filterMethod="setAutocompletes"
      />
    </CustomField>

    <CustomField label="Cloud Infrastructure">
      <CustomAutocomplete
        v-model="filters.type"
        :filterResult="filteredtype"
        :filterMethod="setAutocompletes"
      />
    </CustomField>

    <CustomField label="Pending">
      <CustomSlider
        v-model="filters.pending"
        :ticks="[minpending, maxpending]"
        :steps="1"
      />
    </CustomField>

    <CustomField label="Estimated Savings">
      <CustomSlider
        v-model="filters.estimatedCostSaving"
        :ticks="[minestimatedCostSaving, maxestimatedCostSaving]"
        :steps="0.01"
      />
    </CustomField>

    <CustomField label="Status">
      <CustomSelect
        v-model="filters.lifecycleState"
        :options="filteredlifecycleState"
      />
    </CustomField>

    <CustomField label="Importance">
      <CustomSelect
        v-model="filters.importance"
        :options="filteredimportance"
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
      autocompletes: ['name', 'type'],
      sliders: ['pending', 'estimatedCostSaving'],
      selects: ['lifecycleState', 'importance']
    }
  },
  created() {
    this.fullData = this.getRecommendations
  },
  computed: {
    ...mapGetters(['getRecommendations'])
  }
}
</script>

<style lang="scss" scoped></style>
