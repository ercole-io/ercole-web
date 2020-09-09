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
        <div
          class="column is-3 has-text-right is-flex"
          style="justify-content: flex-end;"
        >
          <Filesys :filesys="filesys" />

          <b-button
            class="ml-2"
            type="is-danger is-small"
            @click="deleteHost(hostname)"
          >
            Dismiss
          </b-button>
        </div>
      </div>
    </boxContent>

    <BoxContent>
      <HostInfo :hostInfo="hostInfoInfo(getCurrentHost)" />
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
import { mapTechType, mapClustStatus } from '@/helpers/helpers.js'

const startDate = moment()
  .subtract(1, 'week')
  .format('YYYY-MM-DD')
const endDate = moment()
  .add(1, 'days')
  .format('YYYY-MM-DD')

const checkHostDate = date => {
  const dateToCheck = moment(date).format('YYYY-MM-DD')
  return moment(dateToCheck).isBetween(startDate, endDate)
}

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
  async beforeMount() {
    await this.getHostByName(this.hostname)
    bus.$emit('dynamicTitle', this.hostname)

    this.hostDbsInfo(this.getCurrentHost.features.oracle.database.databases)
    this.hostNotificationInfo(this.getCurrentHost.alerts)
    this.filesys = this.getCurrentHost.filesystems
    this.chartData = this.getGpuGrowthChart
  },
  methods: {
    ...mapActions(['getHostByName']),
    hostInfoInfo(host) {
      const info = host.info
      this.hostInfo.general = [
        {
          name: 'Environment',
          value: host.environment || '-'
        },
        {
          name: 'Technologie',
          value: mapTechType(host.features)
        },
        {
          name: 'Clust',
          value: mapClustStatus(host.clusterMembershipStatus),
          hasIcon: true
        },
        {
          name: 'OS',
          value: info.os || '-'
        },
        {
          name: 'Kernel',
          value: info.kernel || '-'
        },
        {
          name: 'Memorie',
          value: info.memoryTotal || '-'
        },
        {
          name: 'Swap',
          value: info.swapTotal || '-'
        }
      ]
      this.hostInfo.virtual = [
        {
          name: 'Platform',
          value: info.hardwareAbstractionTechnology || '-'
        },
        {
          name: 'Cluster',
          value: host.cluster || '-'
        },
        {
          name: 'Node',
          value: host.virtualizationNode || '-'
        }
      ]
      this.hostInfo.cpu = [
        {
          name: 'Model',
          value: info.cpuModel || '-'
        },
        {
          name: 'Threads',
          value: info.cpuThreads || '-'
        },
        {
          name: 'Cores',
          value: info.cpuCores || '-'
        },
        {
          name: 'Socket',
          value: info.cpuSockets || '-'
        }
      ]
      this.hostInfo.agent = [
        {
          name: 'Version',
          value: host.agentVersion || '-'
        },
        {
          name: 'Last Update',
          value: moment(host.createdAt).format('DD/MM/YYYY hh:mm') || '-'
        }
      ]

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
        total: host.filter(val => {
          if (checkHostDate(val.date)) {
            return val
          }
        }).length,
        agents: host.filter(val => {
          if (checkHostDate(val.date)) {
            return val.alertCategory === 'AGENT'
          }
        }).length,
        licenses: host.filter(val => {
          if (checkHostDate(val.date)) {
            return val.alertCategory === 'LICENSE'
          }
        }).length,
        engine: host.filter(val => {
          if (checkHostDate(val.date)) {
            return val.alertCategory === 'ENGINE'
          }
        }).length,
        hostname: this.hostname
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
