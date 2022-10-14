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

        <CustomField :label="$t('common.fields.env')">
          <CustomSelect
            v-model="filters.environment"
            :options="filteredenvironment"
          />
        </CustomField>

        <CustomField :label="$t('common.fields.dbs')">
          <CustomAutocomplete
            v-model="filters.databases"
            :filterResult="filtereddatabases"
            :filterMethod="setAutocompletes"
          />
        </CustomField>

        <CustomField :label="$t('common.fields.tech')">
          <CustomSelect
            v-model="filters.techType"
            :options="filteredtechType"
          />
        </CustomField>

        <CustomField :label="$t('common.fields.os')">
          <CustomAutocomplete
            v-model="filters.os"
            :filterResult="filteredos"
            :filterMethod="setAutocompletes"
          />
        </CustomField>

        <CustomField :label="$t('common.fields.clust')">
          <CustomRadio v-model="filters.iconCluster" />
        </CustomField>

        <CustomField :label="$t('common.fields.kernel')">
          <CustomAutocomplete
            v-model="filters.kernel"
            :filterResult="filteredkernel"
            :filterMethod="setAutocompletes"
          />
        </CustomField>

        <CustomField :label="$t('common.fields.memory')">
          <CustomSlider
            v-model="filters.memorytotal"
            :ticks="[minmemorytotal, maxmemorytotal]"
          />
        </CustomField>

        <CustomField :label="$t('common.fields.swap')">
          <CustomSlider
            v-model="filters.swaptotal"
            :ticks="[minswaptotal, maxswaptotal]"
          />
        </CustomField>

        <CustomField :label="$t('common.fields.updated')">
          <CustomDatepicker v-model="startDate" />
        </CustomField>
      </template>

      <template slot="Virtual">
        <CustomField :label="$t('common.fields.platform')">
          <CustomSelect
            v-model="filters.platform"
            :options="filteredplatform"
          />
        </CustomField>

        <CustomField :label="$t('common.fields.cluster')">
          <CustomAutocomplete
            v-model="filters.cluster"
            :filterResult="filteredcluster"
            :filterMethod="setAutocompletes"
          />
        </CustomField>

        <CustomField :label="$t('common.fields.node')">
          <CustomAutocomplete
            v-model="filters.virtNode"
            :filterResult="filteredvirtNode"
            :filterMethod="setAutocompletes"
          />
        </CustomField>
      </template>

      <template slot="CPU">
        <CustomField :label="$t('common.fields.procModel')">
          <CustomAutocomplete
            v-model="filters.model"
            :filterResult="filteredmodel"
            :filterMethod="setAutocompletes"
          />
        </CustomField>

        <CustomField :label="$t('common.fields.threads')">
          <CustomSlider
            v-model="filters.threads"
            :ticks="[minthreads, maxthreads]"
          />
        </CustomField>

        <CustomField :label="$t('common.fields.cores')">
          <CustomSlider v-model="filters.cores" :ticks="[mincores, maxcores]" />
        </CustomField>

        <CustomField :label="$t('common.fields.socket')">
          <CustomSlider
            v-model="filters.socket"
            :ticks="[minsocket, maxsocket]"
          />
        </CustomField>
      </template>

      <template slot="Agent">
        <CustomField :label="$t('common.fields.version')">
          <CustomSelect v-model="filters.version" :options="filteredversion" />
        </CustomField>
      </template>
    </Collapse>

    <slot />
  </AdvancedFiltersBase>
</template>

<script>
import { mapActions } from 'vuex'
import localFiltersMixin from '@/mixins/localFiltersMixin.js'
import Collapse from '@/components/common/Collapse.vue'

export default {
  mixins: [localFiltersMixin],
  components: {
    Collapse,
  },
  data() {
    return {
      collapses: ['General', 'Virtual', 'CPU', 'Agent'],
      autocompletes: [
        'hostname',
        'databases',
        'model',
        'os',
        'kernel',
        'cluster',
        'virtNode',
      ],
      selects: ['environment', 'techType', 'platform', 'version'],
      sliders: ['threads', 'cores', 'socket', 'memorytotal', 'swaptotal'],
      filters: {
        iconCluster: '',
      },
      startDate: null,
    }
  },
  methods: {
    ...mapActions(['getHosts']),
    resetFilters() {
      this.filters = {
        iconCluster: '',
      }
      this.startDate = null
    },
  },
  watch: {
    startDate(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.getHosts(this.startDate)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.static-filters {
  padding: 10px 10px 0 10px;
  background-color: #f5f5f5;
  overflow: auto;
  max-height: 550px;
  position: relative;
}
</style>
