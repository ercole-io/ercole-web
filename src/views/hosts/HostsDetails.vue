<template>
  <section>
    <PageTitle>
      <NotificationsInfo :info="notificationInfo" />
    </PageTitle>

    <boxContent>
      <div class="columns">
        <div class="column is-9">
          <HostTags
            title="Host Tags:"
            inputWidth="150"
            :tagsList="['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4']"
            @addTag="handleAddTag"
            @removeTag="handleRemoveTag"
            @editTag="handleEditTag"
          />
        </div>
        <div class="column is-2 has-text-right">
          <Filesys :filesys="filesys" />
        </div>
        <div class="column is-1 has-text-right">
          <b-button type="is-danger is-small" @click="deleteHost(hostname)">
            Dismiss
          </b-button>
        </div>
      </div>
    </boxContent>

    <BoxContent>
      <HostInfo :hostInfo="hostInfo" />
    </BoxContent>

    <div class="columns">
      <BoxContent :title="`Databases of ${hostname}`" class="column is-8">
        <HostDatabases :hostDbs="hostDbs" v-if="hostDbs.length > 0" />
        <noContent
          v-else
          noContentText="There are no Databases for this Host"
        />
      </BoxContent>

      <BoxContent :title="`CPU Usage of ${hostname}`" class="column is-4">
        <HostGraph :chartData="chartData" />
      </BoxContent>
    </div>
  </section>
</template>

<script>
import _ from 'lodash'
import moment from 'moment'
import { bus } from '@/helpers/eventBus.js'
import { mapGetters, mapActions } from 'vuex'
import PageTitle from '@/components/common/PageTitle.vue'
import BoxContent from '@/components/common/BoxContent.vue'
import NotificationsInfo from '@/components/hosts/hostDetails/NotificationsInfo.vue'
import HostTags from '@/components/common/Tags.vue'
import HostInfo from '@/components/hosts/hostDetails/HostInfo.vue'
import HostGraph from '@/components/hosts/hostDetails/Graph.vue'
import HostDatabases from '@/components/hosts/hostDetails/databases/Databases.vue'
import noContent from '@/components/common/NoContent.vue'
import Filesys from '@/components/hosts/hostDetails/Filesys.vue'
import axiosDefault from '@/axios/axios-default.js'

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
    HostInfo,
    HostGraph,
    HostDatabases,
    noContent,
    Filesys
  },
  data() {
    return {
      hostInfo: {},
      hostDbs: [],
      notificationInfo: {},
      filesys: [],
      chartData: []
    }
  },
  async created() {
    await this.getHostByName(this.hostname)
    bus.$emit('dynamicTitle', this.hostname)

    this.hostInfoInfo(this.getCurrentHost)
    this.hostDbsInfo(this.getCurrentHost.features.oracle.database.databases)
    this.hostNotificationInfo(this.getCurrentHost.alerts)
    this.filesys = this.getCurrentHost.filesystems
    this.chartData = this.getGpuGrowthChart
  },
  methods: {
    ...mapActions(['getHostByName']),
    hostInfoInfo(host) {
      this.hostInfo = {
        hostname: host.hostname || '-',
        environment: host.environment || '-',
        hostType: host.hostType || '-',
        platform: host.platform || '-',
        cluster: host.cluster || '-',
        physicalHost: host.physicalHost || '-',
        os: host.info.os || '-',
        kernel: host.info.kernel || '-',
        memoryTotal: host.info.memoryTotal || '-',
        swapTotal: host.info.swapTotal || '-',
        aixCluster: host.info.aixCluster,
        model: host.info.cpuModel || '-',
        threads: host.info.cpuThreads || '-',
        cores: host.info.cpuCores || '-',
        socket: host.info.socket || '-',
        version: host.version || '-',
        createdAt: moment(host.createdAt).format('DD/MM/YYYY hh:mm') || '-'
      }
      return this.hostInfo
    },
    hostDbsInfo(host) {
      if (host && host.length > 0) {
        _.forEach(host, val => {
          if (val.name) {
            this.hostDbs.push(val)
          }
        })
        return this.hostDbs
      }
    },
    hostNotificationInfo(host) {
      return (this.notificationInfo = {
        total: host.length,
        agents: host.filter(val => val.alertCode === 'NEW_DATABASE').length,
        licenses: host.filter(val => val.alertCode === 'NEW_LICENSE').length,
        systems: host.filter(
          val =>
            val.alertCode !== 'NEW_LICENSE' && val.alertCode !== 'NEW_DATABASE'
        ).length
      })
    },
    deleteHost(hostname) {
      this.$buefy.dialog.confirm({
        title: 'Dismissing Host',
        message: `Are you sure you want to <b>dismiss</b> the host <b>${hostname}</b>? This action cannot be undone.`,
        confirmText: 'Dismiss Host',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          axiosDefault.delete(`/hosts/${hostname}`).then(() => {
            this.$router.push({ name: 'hosts' })
            bus.$emit('hostDismissedMsg', hostname)
          })
        }
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
    ...mapGetters(['getCurrentHost', 'getGpuGrowthChart'])
  }
}
</script>

<style lang="scss" scoped></style>
