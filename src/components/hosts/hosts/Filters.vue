<template>
  <AdvancedFiltersBase :submitAction="applyHostsFilters">
    <Collapse :collapses="collapses">
      <template slot="General">
        <CustomField :label="$t('common.fields.hostname')">
          <CustomAutocomplete
            v-model="hostname"
            :filterResult="filteredhostname"
            :filterMethod="setAutocompletes"
          />
        </CustomField>

        <CustomField :label="$t('common.fields.env')">
          <CustomSelect v-model="environment" :options="filteredenvironment" />
        </CustomField>

        <CustomField :label="$t('common.fields.dbs')">
          <CustomAutocomplete
            v-model="databases"
            :filterResult="filtereddatabases"
            :filterMethod="setAutocompletes"
          />
        </CustomField>

        <CustomField :label="$t('common.fields.tech')">
          <CustomSelect v-model="techType" :options="filteredtechType" />
        </CustomField>

        <CustomField :label="$t('common.fields.os')">
          <CustomAutocomplete
            v-model="os"
            :filterResult="filteredos"
            :filterMethod="setAutocompletes"
          />
        </CustomField>

        <CustomField :label="$t('common.fields.clust')">
          <CustomRadio v-model="iconCluster" />
        </CustomField>

        <CustomField :label="$t('common.fields.kernel')">
          <CustomAutocomplete
            v-model="kernel"
            :filterResult="filteredkernel"
            :filterMethod="setAutocompletes"
          />
        </CustomField>

        <CustomField :label="$t('common.fields.memory')">
          <CustomSlider
            v-model="memorytotal"
            :ticks="[minmemorytotal, maxmemorytotal]"
          />
        </CustomField>

        <CustomField :label="$t('common.fields.swap')">
          <CustomSlider
            v-model="swaptotal"
            :ticks="[minswaptotal, maxswaptotal]"
          />
        </CustomField>

        <CustomField :label="$t('common.fields.updated')">
          <CustomDatepicker v-model="updated" />
        </CustomField>
      </template>

      <template slot="Virtual">
        <CustomField :label="$t('common.fields.platform')">
          <CustomSelect v-model="platform" :options="filteredplatform" />
        </CustomField>

        <CustomField :label="$t('common.fields.cluster')">
          <CustomAutocomplete
            v-model="cluster"
            :filterResult="filteredcluster"
            :filterMethod="setAutocompletes"
          />
        </CustomField>

        <CustomField :label="$t('common.fields.node')">
          <CustomAutocomplete
            v-model="virtNode"
            :filterResult="filteredvirtNode"
            :filterMethod="setAutocompletes"
          />
        </CustomField>
      </template>

      <template slot="CPU">
        <CustomField :label="$t('common.fields.procModel')">
          <CustomAutocomplete
            v-model="model"
            :filterResult="filteredmodel"
            :filterMethod="setAutocompletes"
          />
        </CustomField>

        <CustomField :label="$t('common.fields.threads')">
          <CustomSlider v-model="threads" :ticks="[minthreads, maxthreads]" />
        </CustomField>

        <CustomField :label="$t('common.fields.cores')">
          <CustomSlider v-model="cores" :ticks="[mincores, maxcores]" />
        </CustomField>

        <CustomField :label="$t('common.fields.socket')">
          <CustomSlider v-model="socket" :ticks="[minsocket, maxsocket]" />
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
import { mapActions, mapMutations } from 'vuex'
import localFiltersMixin from '@/mixins/localFiltersMixin.js'
import Collapse from '@/components/common/Collapse.vue'

export default {
  name: 'hosts-filters-component',
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
      hostname: null,
      environment: null,
      updated: null,
      databases: null,
      techType: null,
      os: null,
      iconCluster: '',
      kernel: null,
      memorytotal: null,
      swaptotal: null,
      platform: null,
      cluster: null,
      virtNode: null,
      model: null,
      threads: null,
      cores: null,
      socket: null,
    }
  },
  methods: {
    ...mapActions(['getHosts']),
    ...mapMutations(['SET_HOSTS_PARAMS', 'SET_PAGE_NUM']),
    applyHostsFilters() {
      this.SET_PAGE_NUM(1)
      this.SET_HOSTS_PARAMS({
        hostname: this.hostname,
        environment: this.environment,
        updated: this.updated,
        databases: this.databases,
        techType: this.techType,
        os: this.os,
        iconCluster: this.iconCluster,
        kernel: this.kernel,
        memorytotal: this.memorytotal,
        swaptotal: this.swaptotal,
        platform: this.platform,
        cluster: this.cluster,
        virtNode: this.virtNode,
        model: this.model,
        threads: this.threads,
        cores: this.cores,
        socket: this.socket,
      })
      this.getHosts()
    },
    resetFilters() {
      this.hostname = null
      this.environment = null
      this.updated = null
      this.databases = null
      this.techType = null
      this.os = null
      this.iconCluster = ''
      this.kernel = null
      this.memorytotal = null
      this.swaptotal = null
      this.platform = null
      this.cluster = null
      this.virtNode = null
      this.model = null
      this.threads = null
      this.cores = null
      this.socket = null

      this.SET_HOSTS_PARAMS({
        hostname: null,
        environment: null,
        updated: null,
        databases: null,
        techType: null,
        os: null,
        iconCluster: '',
        kernel: null,
        memorytotal: null,
        swaptotal: null,
        platform: null,
        cluster: null,
        virtNode: null,
        model: null,
        threads: null,
        cores: null,
        socket: null,
      })
    },
  },
  watch: {
    updated(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.getHosts(this.updated)
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
