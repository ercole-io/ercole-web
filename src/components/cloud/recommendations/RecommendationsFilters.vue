<template>
  <AdvancedFiltersBase :submitAction="apply">
    <CustomField label="Recommendation">
      <CustomAutocomplete
        v-model="filters.name"
        :filterResult="filteredname"
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
        v-model="filters.costSaving"
        :ticks="[mincostSaving, maxcostSaving]"
        :steps="0.01"
      />
    </CustomField>

    <CustomField label="Status">
      <CustomSelect v-model="filters.status" :options="filteredstatus" />
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
      autocompletes: ['name'],
      sliders: ['pending', 'costSaving'],
      selects: ['status', 'importance']
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
