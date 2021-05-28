<template>
  <AdvancedFiltersBase :submitAction="apply">
    <CustomField label="Hostname">
      <CustomAutocomplete
        v-model="filters.hostname"
        :filterResult="filteredhostname"
        :filterMethod="setAutocompletes"
      />
    </CustomField>

    <CustomField label="Env">
      <CustomSelect
        v-model="filters.environment"
        :options="filteredenvironment"
      />
    </CustomField>

    <CustomField label="DBs">
      <CustomAutocomplete
        v-model="filters.databases"
        :filterResult="filtereddatabases"
        :filterMethod="setAutocompletes"
      />
    </CustomField>

    <CustomField label="Tech">
      <CustomSelect v-model="filters.techType" :options="filteredtechType" />
    </CustomField>

    <CustomField label="OS">
      <CustomAutocomplete
        v-model="filters.os"
        :filterResult="filteredos"
        :filterMethod="setAutocompletes"
      />
    </CustomField>

    <CustomField label="Clust">
      <CustomRadio v-model="filters.iconCluster" />
    </CustomField>

    <CustomField label="Kernel">
      <CustomAutocomplete
        v-model="filters.kernel"
        :filterResult="filteredkernel"
        :filterMethod="setAutocompletes"
      />
    </CustomField>

    <CustomField label="Memory">
      <CustomSlider
        v-model="filters.memorytotal"
        :ticks="[minmemorytotal, maxmemorytotal]"
      />
    </CustomField>

    <CustomField label="Swap">
      <CustomSlider
        v-model="filters.swaptotal"
        :ticks="[minswaptotal, maxswaptotal]"
      />
    </CustomField>

    <CustomField label="Updated">
      <CustomDatepicker v-model="startDate" />
    </CustomField>

    <Collapse title="Virtual" id="virtual" padding margin>
      <CustomField label="Platform">
        <CustomSelect v-model="filters.platform" :options="filteredplatform" />
      </CustomField>

      <CustomField label="Cluster">
        <CustomAutocomplete
          v-model="filters.cluster"
          :filterResult="filteredcluster"
          :filterMethod="setAutocompletes"
        />
      </CustomField>

      <CustomField label="Node">
        <CustomAutocomplete
          v-model="filters.virtNode"
          :filterResult="filteredvirtNode"
          :filterMethod="setAutocompletes"
        />
      </CustomField>
    </Collapse>

    <Collapse title="CPU" id="cpu" padding margin>
      <CustomField label="Processor Model">
        <CustomAutocomplete
          v-model="filters.model"
          :filterResult="filteredmodel"
          :filterMethod="setAutocompletes"
        />
      </CustomField>

      <CustomField label="threads">
        <CustomSlider
          v-model="filters.threads"
          :ticks="[minthreads, maxthreads]"
        />
      </CustomField>

      <CustomField label="Cores">
        <CustomSlider v-model="filters.cores" :ticks="[mincores, maxcores]" />
      </CustomField>

      <CustomField label="Socket">
        <CustomSlider
          v-model="filters.socket"
          :ticks="[minsocket, maxsocket]"
        />
      </CustomField>
    </Collapse>

    <Collapse title="Agent" id="agent" padding margin>
      <CustomField label="Version">
        <CustomSelect v-model="filters.version" :options="filteredversion" />
      </CustomField>
    </Collapse>
  </AdvancedFiltersBase>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import localFiltersMixin from '@/mixins/localFiltersMixin.js'
import Collapse from '@/components/common/Collapse.vue'

export default {
  mixins: [localFiltersMixin],
  components: {
    Collapse
  },
  data() {
    return {
      autocompletes: [
        'hostname',
        'databases',
        'model',
        'os',
        'kernel',
        'cluster',
        'virtNode'
      ],
      selects: ['environment', 'techType', 'platform', 'version'],
      sliders: ['threads', 'cores', 'socket', 'memorytotal', 'swaptotal'],
      filters: {
        iconCluster: ''
      },
      startDate: null
    }
  },
  created() {
    this.fullData = this.getAllHosts
  },
  methods: {
    ...mapActions(['getHosts']),
    resetFilters() {
      this.filters = {
        iconCluster: ''
      }
      this.startDate = null
    }
  },
  computed: {
    ...mapGetters(['getAllHosts'])
  },
  watch: {
    startDate(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.getHosts(this.startDate)
      }
    }
  }
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
