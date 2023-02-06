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
          <CustomSlider
            v-model="filters.databases"
            :ticks="[mindatabases, maxdatabases]"
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
          />
        </CustomField>

        <CustomField :label="$t('common.fields.clusterLicenses')">
          <CustomSlider
            v-model="filters.clusterLicenses"
            :ticks="[minclusterLicenses, maxclusterLicenses]"
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
  name: 'licenses-used-hosts-filters-component',
  mixins: [localFiltersMixin],
  components: {
    CustomSelectAutocomplete,
    Collapse,
  },
  data() {
    return {
      collapses: ['General'],
      autocompletes: ['hostname', 'fullPartNumber', 'metric'],
      sliders: ['databases', 'usedLicenses', 'clusterLicenses'],
    }
  },
  beforeMount() {
    bus.$on('onUsedTabChange', (value) => {
      if (value === 1) {
        this.reset(this.resetFilters)
        bus.$emit('data', this.getUsedLicensesByHost)
      }
    })
  },
  computed: {
    ...mapGetters(['getUsedLicensesByHost']),
  },
}
</script>

<style lang="scss" scoped></style>
