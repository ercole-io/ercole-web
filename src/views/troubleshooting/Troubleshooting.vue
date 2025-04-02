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
          <VHostNoCluster :data="vHostsNoCluster" v-if="!noClusterLoading" />
          <Loading :isLoading="noClusterLoading" style="min-height: 640px" />
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
          v-if="showRecommendationsErrors"
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
import { mapActions, mapGetters, mapState } from 'vuex'
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
      noClusterLoading: true,
      recErrorsLoading: true,
      showRecommendationsErrors: false,
    }
  },
  async beforeMount() {
    this.showRecommendationsErrors = this.getDynamicMenu.some(
      (val) => val.name === 'Cloud Advisors' && val.parent === ''
    )

    try {
      await Promise.all([
        this.getNoDataAgents(),
        this.getMissingDbs(),
        this.getvHostsNoCluster(),
        this.getRecommendationErrors(),
      ])
    } catch (error) {
      console.error('Erro ao carregar troubleshooting:', error)
    } finally {
      this.agentsLoading = false
      this.missingDbsLoading = false
      this.noClusterLoading = false
      this.recErrorsLoading = false
    }
  },
  computed: {
    ...mapState(['troubleshooting']),
    ...mapGetters(['getDynamicMenu']),
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
  },
  methods: {
    ...mapActions([
      'getNoDataAgents',
      'getMissingDbs',
      'getvHostsNoCluster',
      'getRecommendationErrors',
    ]),
  },
}
</script>
