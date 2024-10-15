<template>
  <AdvancedFiltersBase :submitAction="apply">
    <Collapse :collapses="collapses">
      <template slot="General">
        <CustomField :label="$t('common.fields.cluster')">
          <CustomAutocomplete
            v-model="filters.cluster"
            :filterResult="filteredcluster"
            :filterMethod="setAutocompletes"
          />
        </CustomField>

        <CustomField label="Hosts">
          <CustomSlider
            v-model="filters.hostCount"
            :ticks="[minhostCount, maxhostCount]"
            :steps="1"
          />
        </CustomField>

        <CustomField :label="$t('common.fields.fullAgreement')">
          <CustomSelectAutocomplete
            v-model="filters.fullPartNumber"
            :filterResult="filteredfullPartNumber"
            :filterMethod="setAutocompletes"
            field="fullPartNumber"
          />
        </CustomField>

        <CustomField :label="$t('common.fields.metric')">
          <CustomAutocomplete
            v-model="filters.metric"
            :filterResult="filteredmetric"
            :filterMethod="setAutocompletes"
          />
        </CustomField>

        <CustomField :label="$t('common.fields.usedLicenses')">
          <CustomSlider
            v-model="filters.usedLicenses"
            :ticks="[minusedLicenses, maxusedLicenses]"
            :steps="1"
          />
        </CustomField>
      </template>
    </Collapse>

    <slot />
  </AdvancedFiltersBase>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { mapGetters } from 'vuex'
import localFiltersMixin from '@/mixins/localFiltersMixin.js'
import CustomSelectAutocomplete from '@/components/common/Form/CustomSelectAutocomplete.vue'
import Collapse from '@/components/common/Collapse.vue'

export default {
  name: 'licenses-used-veritas-filters-component',
  mixins: [localFiltersMixin],
  components: {
    CustomSelectAutocomplete,
    Collapse,
  },
  data() {
    return {
      collapses: ['General'],
      autocompletes: ['cluster', 'fullPartNumber', 'metric'],
      sliders: ['usedLicenses', 'hostCount'],
    }
  },
  beforeMount() {
    bus.$on('onUsedTabChange', (value) => {
      if (value === 3) {
        this.reset(this.resetFilters)
        bus.$emit('data', this.getUsedLicensesByVeritas)
      }
    })
  },
  computed: {
    ...mapGetters(['getUsedLicensesByVeritas']),
  },
}
</script>

<style lang="scss" scoped></style>
