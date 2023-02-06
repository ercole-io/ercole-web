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

        <CustomField :label="$t('common.fields.name')">
          <CustomAutocomplete
            v-model="filters.dbName"
            :filterResult="filtereddbName"
            :filterMethod="setAutocompletes"
          />
        </CustomField>

        <CustomField label="First">
          <CustomDatepicker v-model="firstUsageDate" />
        </CustomField>

        <CustomField label="Last">
          <CustomDatepicker v-model="lastUsageDate" />
        </CustomField>

        <CustomField label="Detected">
          <CustomSlider
            v-model="filters.detectedUsages"
            :ticks="[mindetectedUsages, maxdetectedUsages]"
            :steps="1"
          />
        </CustomField>

        <CustomField label="Product">
          <CustomSelect v-model="filters.product" :options="filteredproduct" />
        </CustomField>

        <CustomField label="Currently">
          <CustomRadio v-model="filters.currentlyUsed" />
        </CustomField>

        <CustomField label="Extra">
          <CustomSelect
            v-model="filters.extraFeatureInfo"
            :options="filteredextraFeatureInfo"
          />
        </CustomField>

        <CustomField label="Feature">
          <CustomSelect v-model="filters.feature" :options="filteredfeature" />
        </CustomField>
      </template>
    </Collapse>

    <slot />
  </AdvancedFiltersBase>
</template>

<script>
import moment from 'moment'
import localFiltersMixin from '@/mixins/localFiltersMixin.js'
import Collapse from '@/components/common/Collapse.vue'

export default {
  name: 'databases-oracle-filters-filters-component',
  mixins: [localFiltersMixin],
  components: {
    Collapse,
  },
  data() {
    return {
      collapses: ['General'],
      autocompletes: ['hostname', 'dbName'],
      selects: ['product', 'extraFeatureInfo', 'feature'],
      sliders: ['detectedUsages'],
      filters: {
        firstUsageDate: null,
        lastUsageDate: null,
        currentlyUsed: '',
      },
      firstUsageDate: null,
      lastUsageDate: null,
    }
  },
  methods: {
    resetFilters() {
      this.filters = {
        firstUsageDate: null,
        lastUsageDate: null,
        currentlyUsed: '',
      }
      this.firstUsageDate = null
      this.lastUsageDate = null
    },
  },
  watch: {
    firstUsageDate(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.filters = {
          firstUsageDate: moment(this.firstUsageDate).format('DD/MM/YYYY'),
        }
      }
    },
    lastUsageDate(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.filters = {
          lastUsageDate: moment(this.lastUsageDate).format('DD/MM/YYYY'),
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
