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

        <CustomField label="Name">
          <CustomAutocomplete
            v-model="filters.name"
            :filterResult="filteredname"
            :filterMethod="setAutocompletes"
          />
        </CustomField>

        <CustomField label="Status">
          <CustomSelect v-model="filters.status" :options="filteredstatus" />
        </CustomField>

        <CustomField label="Used">
          <CustomSlider
            v-model="filters.used"
            :ticks="[minused, maxused]"
            :steps="1"
          />
        </CustomField>

        <CustomField label="Used GB">
          <CustomSlider
            v-model="filters.usedPerc"
            :ticks="[minusedPerc, maxusedPerc]"
            :steps="1"
          />
        </CustomField>

        <CustomField label="Total">
          <CustomSlider
            v-model="filters.total"
            :ticks="[mintotal, maxtotal]"
            :steps="1"
          />
        </CustomField>

        <CustomField label="Max Size">
          <CustomSlider
            v-model="filters.maxSize"
            :ticks="[minmaxSize, maxmaxSize]"
            :steps="1"
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
  mixins: [localFiltersMixin],
  components: {
    Collapse,
  },
  data() {
    return {
      collapses: ['General'],
      autocompletes: ['hostname', 'name'],
      selects: ['status'],
      sliders: ['used', 'usedPerc', 'total', 'maxSize'],
    }
  },
}
</script>

<style lang="scss" scoped></style>
