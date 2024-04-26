<template>
  <div class="columns">
    <div class="column">
      <BoxContent
        title="Agents With No Data"
        customStyle="padding: 0 20px 10px 20px"
        border
        hasShadow
      >
        <p slot="customTitle">
          (<span class="collapsible-agents-header">
            {{ agentsNoData.length }} </span
          >)
        </p>
        <AgentsNoData :data="agentsNoData" v-if="!agentsLoading" />
        <Loading :isLoading="agentsLoading" style="min-height: 640px" />
      </BoxContent>
    </div>
    <div class="column">
      <BoxContent
        title="Hosts With Missing Databases"
        customStyle="padding: 0 20px 10px 20px"
        border
        hasShadow
      >
        <p slot="customTitle">
          (<span class="collapsible-missing-header">
            {{ missingDbs.length }} </span
          >)
        </p>
        <MissingDbs :data="missingDbs" v-if="!missingDbsLoading" />
        <Loading :isLoading="missingDbsLoading" style="min-height: 640px" />
      </BoxContent>
    </div>
    <div class="column">
      <BoxContent
        title="Virtual Hosts with No CLuster"
        customStyle="padding: 0 20px 10px 20px"
        border
        hasShadow
      >
        <p slot="customTitle">
          (<span class="collapsible-nocluster-header">
            {{ vHostsNoCluster.length }} </span
          >)
        </p>
        <VHostNoCluster :data="vHostsNoCluster" v-if="!noCLusterLoading" />
        <Loading :isLoading="noCLusterLoading" style="min-height: 640px" />
      </BoxContent>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import BoxContent from '@/components/common/BoxContent.vue'
import AgentsNoData from '@/components/troubleshooting/AgentsNoData.vue'
import MissingDbs from '@/components/troubleshooting/MissingDbs.vue'
import VHostNoCluster from '@/components/troubleshooting/VHostNoCluster.vue'
import Loading from '@/components/common/Loading.vue'

export default {
  name: 'troubleshooting-page',
  components: {
    BoxContent,
    AgentsNoData,
    MissingDbs,
    VHostNoCluster,
    Loading,
  },
  data() {
    return {
      agentsLoading: true,
      missingDbsLoading: true,
      noCLusterLoading: true,
    }
  },
  beforeMount() {
    this.getNoDataAgents().then(() => {
      this.agentsLoading = false
    })
    this.getMissingDbs().then(() => {
      this.missingDbsLoading = false
    })
    this.getvHostsNoCluster().then(() => {
      this.noCLusterLoading = false
    })
  },
  methods: {
    ...mapActions(['getNoDataAgents', 'getMissingDbs', 'getvHostsNoCluster']),
  },
  computed: {
    ...mapState(['troubleshooting']),
    agentsNoData() {
      return this.troubleshooting.noDataAgents
    },
    missingDbs() {
      return this.troubleshooting.missingDbs
    },
    vHostsNoCluster() {
      return this.troubleshooting.vHostsNoCluster
    },
  },
}
</script>

<style lang="scss" scoped></style>
