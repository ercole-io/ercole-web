<template>
  <section>
    <PageTitle>
      <NotificationsInfo :info="notificationInfo" />
    </PageTitle>

    <boxContent>
      <HostTags
        title="Host Tags:"
        inputWidth="150"
        :tagsList="['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4']"
        @addTag="handleAddTag"
        @removeTag="handleRemoveTag"
        @editTag="handleEditTag"
      />
    </boxContent>

    <BoxContent>
      <HostTable :hostTable="hostTable" />
    </BoxContent>

    <div class="columns">
      <BoxContent
        :title="`GPUGrowth of ${currentHostName}`"
        class="column is-4"
      >
        <HostGraph />
      </BoxContent>

      <BoxContent
        :title="`Databases of ${currentHostName}`"
        class="column is-8"
      >
        <HostDatabases :hostDbs="hostDbs" v-if="hostDbs.length > 0" />
        <noContent
          v-else
          noContentText="There are no Databases for this Host"
        />
      </BoxContent>
    </div>
  </section>
</template>

<script>
import formatDate from '@/filters/formatDate.js'
import { bus } from '@/helpers/eventBus.js'
import { mapGetters, mapActions } from 'vuex'
import PageTitle from '@/components/common/PageTitle.vue'
import BoxContent from '@/components/common/BoxContent.vue'
import NotificationsInfo from '@/components/hosts/hostDetails/NotificationsInfo.vue'
import HostTags from '@/components/common/Tags.vue'
import HostTable from '@/components/hosts/hostDetails/Table.vue'
import HostGraph from '@/components/hosts/hostDetails/Graph.vue'
import HostDatabases from '@/components/hosts/hostDetails/databases/Databases.vue'
import noContent from '@/components/common/NoContent.vue'

export default {
  props: {
    hostname: {
      type: String,
      required: true
    }
  },
  components: {
    PageTitle,
    BoxContent,
    NotificationsInfo,
    HostTags,
    HostTable,
    HostGraph,
    HostDatabases,
    noContent
  },
  data() {
    return {
      currentHostName: '',
      hostTable: {},
      hostDbs: [],
      notificationInfo: {}
    }
  },
  async created() {
    await this.getHostByName(this.hostname)

    this.currentHostName = this.getCurrentHost.Hostname
    bus.$emit('dynamicTitle', this.currentHostName)

    this.hostTableInfo(this.getCurrentHost)
    this.hostDbsInfo(this.getCurrentHost.Extra.Databases)
    this.hostNotificationInfo(this.getCurrentHost.Alerts)
  },
  methods: {
    ...mapActions(['getHostByName']),
    hostTableInfo(host) {
      return (this.hostTable = {
        hostname: host.Hostname || '-',
        environment: host.Environment || '-',
        filesys: host.Extra.Filesystems || '-',
        hostType: host.HostType || '-',
        platform: host.platform || '-',
        cluster: host.Cluster || '-',
        physicalHost: host.PhysicalHost || '-',
        os: host.Info.OS || '-',
        kernel: host.Info.Kernel || '-',
        memoryTotal: host.Info.MemoryTotal || '-',
        swapTotal: host.Info.SwapTotal || '-',
        aixCluster: host.Info.AixCluster || '-',
        model: host.Info.CPUModel || '-',
        threads: host.Info.CPUThreads || '-',
        cores: host.Info.CPUCores || '-',
        socket: host.Info.Socket || '-',
        version: host.Version || '-',
        createdAt: formatDate(host.CreatedAt) || '-'
      })
    },
    hostDbsInfo(host) {
      if (host.length > 0) {
        this._.forEach(host, val => {
          if (val.Name) {
            this.hostDbs.push(val)
          }
        })
        return this.hostDbs
      }
    },
    hostNotificationInfo(host) {
      return (this.notificationInfo = {
        total: host.length,
        agents: host.filter(val => val.AlertCode === 'NEW_DATABASE').length,
        licenses: host.filter(val => val.AlertCode === 'NEW_LICENSE').length,
        systems: host.filter(
          val =>
            val.AlertCode !== 'NEW_LICENSE' && val.AlertCode !== 'NEW_DATABASE'
        ).length
      })
    },
    handleAddTag(value) {
      console.log('make api call to add tag', value)
    },
    handleRemoveTag(value) {
      console.log('make api call to remove tag', value)
    },
    handleEditTag(value) {
      console.log('make api call to edit tag', value)
    }
  },
  computed: {
    ...mapGetters(['getCurrentHost'])
  }
}
</script>

<style lang="scss" scoped></style>
