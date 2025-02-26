<template>
  <section>
    <div class="columns">
      <div class="column">
        <BoxContent
          title="Agents With No Data"
          customStyle="padding: 0 20px 10px 20px"
          class="is-size-5"
          border
          hasShadow
          style="min-height: 660px"
        >
          <p slot="customTitle">
            (<span class="collapsible-agents-header has-text-weight-bold">
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
          class="is-size-5"
          border
          hasShadow
          style="min-height: 660px"
        >
          <p slot="customTitle">
            (<span class="collapsible-missingdb-header has-text-weight-bold">
              {{ missingDbs.length }} </span
            >)
          </p>
          <MissingDbs :data="missingDbs" v-if="!missingDbsLoading" />
          <Loading :isLoading="missingDbsLoading" style="min-height: 640px" />
        </BoxContent>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <BoxContent
          title="Virtual Hosts with No Cluster"
          customStyle="padding: 0 20px 10px 20px"
          class="is-size-5"
          border
          hasShadow
          style="min-height: 640px"
        >
          <p slot="customTitle">
            (<span class="collapsible-nocluster-header has-text-weight-bold">
              {{ vHostsNoCluster.length }} </span
            >)
          </p>
          <VHostNoCluster :data="vHostsNoCluster" v-if="!noCLusterLoading" />
          <Loading :isLoading="noCLusterLoading" style="min-height: 640px" />
        </BoxContent>
      </div>
      <div class="column">
        <BoxContent
          title="Recommendations Errors"
          customStyle="padding: 0 20px 10px 20px"
          class="is-size-5"
          border
          hasShadow
          style="min-height: 640px"
          v-if="hideRecommendationsErrors"
        >
          <p slot="customTitle">
            (<span class="collapsible-recerrors-header has-text-weight-bold">
              {{ recommendationErrors.length }} </span
            >)
          </p>
          <RecErrors :data="recommendationErrors" v-if="!recErrorsLoading" />
          <Loading :isLoading="recErrorsLoading" style="min-height: 640px" />
        </BoxContent>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import BoxContent from '@/components/common/BoxContent.vue'
import AgentsNoData from '@/components/troubleshooting/AgentsNoData.vue'
import MissingDbs from '@/components/troubleshooting/MissingDbs.vue'
import VHostNoCluster from '@/components/troubleshooting/VHostNoCluster.vue'
import RecErrors from '@/components/troubleshooting/RecommendationErrors.vue'
import Loading from '@/components/common/Loading.vue'

export default {
  name: 'troubleshooting-page',
  components: {
    BoxContent,
    AgentsNoData,
    MissingDbs,
    VHostNoCluster,
    RecErrors,
    Loading,
  },
  data() {
    return {
      agentsLoading: true,
      missingDbsLoading: true,
      noCLusterLoading: true,
      recErrorsLoading: true,
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
    this.getRecommendationErrors().then(() => {
      this.recErrorsLoading = false
    })
  },
  methods: {
    ...mapActions([
      'getNoDataAgents',
      'getMissingDbs',
      'getvHostsNoCluster',
      'getRecommendationErrors',
    ]),
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
    recommendationErrors() {
      return this.troubleshooting.recommendationErrors
    },
    hideRecommendationsErrors() {
      return localStorage.getItem('hideRecommendationsErrors')
    },
  },
}
</script>

<style lang="scss" scoped></style>
