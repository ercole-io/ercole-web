<template>
  <AdvancedFiltersBase :submitAction="apply">
    <Collapse :collapses="collapses">
      <template slot="General">
        <CustomField :label="$t('common.fields.tenancy')">
          <CustomAutocomplete
            v-model="filters.tenOCID"
            :filterResult="filteredtenOCID"
            :filterMethod="setAutocompletes"
          />
        </CustomField>

        <CustomField :label="$t('common.fields.recommendation')">
          <CustomAutocomplete
            v-model="filters.name"
            :filterResult="filteredname"
            :filterMethod="setAutocompletes"
          />
        </CustomField>

        <CustomField :label="$t('common.fields.pending')">
          <CustomSlider
            v-model="filters.pending"
            :ticks="[minpending, maxpending]"
            :steps="1"
          />
        </CustomField>

        <CustomField :label="$t('common.fields.estimateSaving')">
          <CustomSlider
            v-model="filters.costSaving"
            :ticks="[mincostSaving, maxcostSaving]"
            :steps="0.01"
          />
        </CustomField>

        <CustomField :label="$t('common.fields.status')">
          <CustomSelect v-model="filters.status" :options="filteredstatus" />
        </CustomField>

        <CustomField :label="$t('common.fields.importance')">
          <CustomSelect
            v-model="filters.importance"
            :options="filteredimportance"
          />
        </CustomField>
      </template>
    </Collapse>
  </AdvancedFiltersBase>
</template>

<script>
import { mapGetters } from 'vuex'
import localFiltersMixin from '@/mixins/localFiltersMixin.js'
import Collapse from '@/components/common/Collapse.vue'

export default {
  mixins: [localFiltersMixin],
  components: {
    Collapse,
  },
  data() {
    return {
      collapses: ['General'],
      autocompletes: ['name', 'tenOCID'],
      sliders: ['pending', 'costSaving'],
      selects: ['status', 'importance'],
    }
  },
  created() {
    this.fullData = this.getRecommendations
  },
  computed: {
    ...mapGetters(['getRecommendations']),
  },
}
</script>

<style lang="scss" scoped></style>
