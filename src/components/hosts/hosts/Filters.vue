<template>
  <AdvancedFiltersBase :submitAction="applyHostsFilters">
    <Collapse :collapses="collapses">
      <template slot="General">
        <CustomField label="Is Missing DB">
          <CustomRadio v-model="isMissingDb" />
        </CustomField>

        <CustomField :label="$t('common.fields.hostname')">
          <CustomAutocomplete v-model="hostname" />
        </CustomField>

        <CustomField :label="$t('common.fields.env')">
          <CustomSelect v-model="environment" :options="filteredenvironment" />
        </CustomField>

        <CustomField :label="$t('common.fields.dbs')">
          <CustomAutocomplete v-model="databases" />
        </CustomField>

        <CustomField :label="$t('common.fields.tech')">
          <CustomSelect v-model="techType" :options="filteredtechType" />
        </CustomField>

        <CustomField :label="$t('common.fields.os')">
          <CustomAutocomplete v-model="os" />
        </CustomField>

        <CustomField :label="$t('common.fields.clust')">
          <CustomRadio v-model="iconCluster" />
        </CustomField>

        <CustomField :label="$t('common.fields.kernel')">
          <CustomAutocomplete v-model="kernel" />
        </CustomField>

        <CustomField :label="$t('common.fields.memory')">
          <b-numberinput v-model="memorytotal" min="0" size="is-small" />
        </CustomField>

        <CustomField :label="$t('common.fields.swap')">
          <b-numberinput v-model="swaptotal" min="0" size="is-small" />
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
          <CustomAutocomplete v-model="cluster" />
        </CustomField>

        <CustomField :label="$t('common.fields.node')">
          <CustomAutocomplete v-model="virtNode" />
        </CustomField>
      </template>

      <template slot="CPU">
        <CustomField :label="$t('common.fields.procModel')">
          <CustomAutocomplete v-model="model" />
        </CustomField>

        <CustomField :label="$t('common.fields.threads')">
          <b-numberinput v-model="threads" min="0" size="is-small" />
        </CustomField>

        <CustomField :label="$t('common.fields.cores')">
          <b-numberinput v-model="cores" min="0" size="is-small" />
        </CustomField>

        <CustomField :label="$t('common.fields.socket')">
          <b-numberinput v-model="socket" min="0" size="is-small" />
        </CustomField>
      </template>

      <template slot="Agent">
        <CustomField :label="$t('common.fields.version')">
          <CustomSelect v-model="version" :options="filteredversion" />
        </CustomField>
      </template>
    </Collapse>

    <slot />
  </AdvancedFiltersBase>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
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
      selects: ['environment', 'techType', 'platform', 'version'],
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
      isMissingDb: '',
      version: null,
    }
  },
  mounted() {
    bus.$on('onResetAction', () => this.resetHostsFilters())
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
        isMissingDb: this.isMissingDb,
        version: this.version,
      })
      this.getHosts()
    },
    resetHostsFilters() {
      this.SET_PAGE_NUM(1)
      this.resetFields()
      this.getHosts()
    },
    resetFields() {
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
      this.isMissingDb = ''
      this.version = null

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
        isMissingDb: '',
        version: null,
      })
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
