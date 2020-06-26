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
        hostname: host.Hostname || '-',
        environment: host.Environment || '-',
        databases: this.mapDbs(host.Features.Oracle),
        hosttype: host.HostType || '-',
        platform: host.Platform || '-',
        cluster: host.Cluster || '-',
        physicalhost: host.PhysicalHost || '-',
        os: host.Info.OS || '-',
        kernel: host.Info.Kernel || '-',
        memorytotal: host.Info.MemoryTotal || '-',
        swaptotal: host.Info.SwapTotal || '-',
        aixcluster: this.mapAixcluster(host.Clusters),
        model: host.Info.CPUModel || '-',
        threads: host.Info.CPUThreads || '-',
        cores: host.Info.CPUCores || '-',
        socket: host.Info.CPUSockets || '-',
        version: host.AgentVersion || '-',
        updated: formatDate(host.CreatedAt) || '-'
      })
    })
  },
  methods: {
    ...mapActions(['getHosts']),
    mapDbs(dbs) {
      if (dbs) {
        if (dbs.Database) {
          if (dbs.Database.Databases.length > 0) {
            return dbs.Database.Databases.map(dbName => dbName.Name)
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
