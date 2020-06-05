<template>
  <section>
    <boxContent>
      <HostDetailsTags />
    </boxContent>

    <BoxContent>
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
        <HostDetailsDbs :hostDbs="hostDbs" />
      </BoxContent>
    </div>
  </section>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { mapGetters, mapActions } from 'vuex'
import BoxContent from '@/components/common/BoxContent.vue'
import HostDetailsTags from '@/components/hosts/HostDetailsTags.vue'
import HostDetailsTable from '@/components/hosts/HostDetailsTable.vue'
import HostDetailsGraph from '@/components/hosts/HostDetailsGraph.vue'
import HostDetailsDbs from '@/components/hosts/HostDetailsDbs.vue'

export default {
  props: {
    hostname: {
      type: String,
      required: true
    }
  },
  components: {
    BoxContent,
    HostDetailsTags,
    HostDetailsTable,
    HostDetailsGraph,
    HostDetailsDbs
  },
  data() {
    return {
      currentHostName: '',
      hostTable: {},
      hostDbs: []
    }
  },
  async created() {
    await this.getHostByName(this.hostname)
    this.currentHostName = this.getCurrentHost.Hostname
    this.hostTableInfo(this.getCurrentHost)
    this.hostDbsInfo(this.getCurrentHost)
    bus.$emit('dynamicTitle', this.currentHostName)
  },
  methods: {
    ...mapActions(['getHostByName']),
    hostTableInfo(host) {
      this.hostTable = {
        hostname: host.Hostname,
        environment: host.Environment,
        filesys: host.Extra.Filesystems,
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
    hostDbsInfo(host) {
      this.hostDbs = host.Extra.Databases
      return this.hostDbs
    }
  },
  computed: {
    ...mapGetters(['getCurrentHost'])
  }
}
</script>

<style lang="scss" scoped></style>
