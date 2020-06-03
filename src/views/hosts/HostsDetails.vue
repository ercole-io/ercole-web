<template>
  <section>
    <BoxContent :title="currentHostName">
      <HostDetailsTable :hostTable="hostTable" />
    </BoxContent>

    <div class="columns">
      <BoxContent
        :title="`GPUGrowth of ${currentHostName}`"
        class="column is-4"
      >
        <HostDetailsGraph />
      </BoxContent>

      <BoxContent
        :title="`Databases of ${currentHostName}`"
        class="column is-8"
      >
        <HostDetailsData :hostData="hostDatabase" />
      </BoxContent>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import BoxContent from '@/components/common/BoxContent.vue'
import HostDetailsTable from '@/components/hosts/HostDetailsTable.vue'
import HostDetailsGraph from '@/components/hosts/HostDetailsGraph.vue'
import HostDetailsData from '@/components/hosts/HostDetailsData.vue'

export default {
  props: {
    hostname: {
      type: String,
      required: true
    }
  },
  components: {
    BoxContent,
    HostDetailsTable,
    HostDetailsGraph,
    HostDetailsData
  },
  data() {
    return {
      currentHostName: '',
      hostTable: {},
      hostDatabase: []
    }
  },
  async created() {
    await this.getHostByName(this.hostname)
    this.currentHostName = this.getCurrentHost.Hostname
    this.hostTableInfo(this.getCurrentHost)
    this.hostDatabaseInfo(this.getCurrentHost)
  },
  methods: {
    ...mapActions(['getHostByName']),
    hostTableInfo(host) {
      this.hostTable = {
        hostname: host.Hostname,
        environment: host.Environment,
        databases: host.Databases,
        hostType: host.HostType,
        platform: host.platform,
        cluster: host.Cluster,
        physicalHost: host.PhysicalHost,
        os: host.Info.OS,
        kernel: host.Info.Kernel,
        memoryTotal: host.Info.MemoryTotal,
        swapTotal: host.Info.SwapTotal,
        aixCluster: host.Info.AixCluster,
        model: host.Info.CPUModel,
        threads: host.Info.CPUThreads,
        cores: host.Info.CPUCores,
        socket: host.Info.Socket,
        version: host.Version,
        createdAt: host.CreatedAt
      }
      return this.hostTable
    },
    hostDatabaseInfo(host) {
      this.hostDatabase = host.Extra.Databases
      return this.hostDatabase
    }
  },
  computed: {
    ...mapGetters(['getCurrentHost'])
  }
}
</script>

<style lang="scss" scoped></style>
