<template>
  <AdvancedFiltersBase
    :submitAction="apply"
    :loadingStatus="licensesUsed.databasesLoading"
    setMinHeight="560"
  >
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
  </AdvancedFiltersBase>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { mapGetters, mapState } from 'vuex'
import localFiltersMixin from '@/mixins/localFiltersMixin.js'
import CustomSelectAutocomplete from '@/components/common/Form/CustomSelectAutocomplete.vue'
import Collapse from '@/components/common/Collapse.vue'

export default {
  mixins: [localFiltersMixin],
  components: {
    CustomSelectAutocomplete,
    Collapse,
  },
  data() {
    return {
      collapses: ['General'],
      autocompletes: ['hostname', 'dbName', 'fullPartNumber', 'metric'],
      sliders: ['usedLicenses', 'clusterLicenses'],
    }
  },
  created() {
    this.fullData = this.getUsedLicensesByDbs

    bus.$on('onUsedTabChange', () => this.reset(this.resetFilters))
  },
  computed: {
    ...mapState(['licensesUsed']),
    ...mapGetters(['getUsedLicensesByDbs']),
  },
}
</script>

<style lang="scss" scoped></style>
