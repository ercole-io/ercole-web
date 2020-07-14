<template>
  <section>
    <PageTitle />
    <HostList :hosts="hosts" />
  </section>
</template>

<script>
import formatDate from '@/filters/formatDate.js'
import { mapGetters, mapActions } from 'vuex'
import PageTitle from '@/components/common/PageTitle.vue'
import HostList from '@/components/hosts/hosts/HostsList.vue'

export default {
  components: {
    PageTitle,
    HostList
  },
  data() {
    return {
      hosts: []
    }
  },
  async created() {
    await this.getHosts()
    this.getAllHosts.forEach(host => {
      this.hosts.push({
        _id: host._id,
        hostname: host.hostname || '-',
        environment: host.environment || '-',
        databases: this.mapDbs(host.features.oracle),
        hosttype: host.hostType || '-',
        platform: host.platform || '-',
        cluster: host.cluster || '-',
        physicalhost: host.physicalHost || '-',
        os: host.info.os || '-',
        kernel: host.info.kernel || '-',
        memorytotal: host.info.memoryTotal || '-',
        swaptotal: host.info.SwapTotal || '-',
        aixcluster: this.mapAixcluster(host.clusters),
        model: host.info.cpuModel || '-',
        threads: host.info.cpuThreads || '-',
        cores: host.info.cpuCores || '-',
        socket: host.info.cpuSockets || '-',
        version: host.agentVersion || '-',
        updated: formatDate(host.createdAt) || '-'
      })
    })
  },
  methods: {
    ...mapActions(['getHosts']),
    mapDbs(dbs) {
      if (dbs) {
        if (dbs.database) {
          if (dbs.database.databases.length > 0) {
            return dbs.database.databases.map(dbName => dbName.name)
          } else {
            return '-'
          }
        } else {
          return '-'
        }
      } else {
        return '-'
      }
    },
    mapAixcluster(aixCluster) {
      return aixCluster
        ? ['check-circle', 'fas', 'is-success', 'yes']
        : ['circle', 'fas', 'is-danger', 'no']
    }
  },
  computed: {
    ...mapGetters(['getAllHosts'])
  }
}
</script>

<style lang="scss"></style>
