<template>
  <section>
    <div class="columns">
      <div class="column">
        <div class="columns is-9">
          <div class="column is-4">
            <TotalTargets :totalTarget="totalTarget" />
          </div>
          <div class="column is-8">
            <Technologies :technologies="technologies" />
          </div>
        </div>
        <div class="columns">
          <div class="column is-12">
            <ChartTabs />
          </div>
        </div>
      </div>
      <div class="column is-3">
        <div class="columns">
          <div class="column">
            <Notifications :agents="agents" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TotalTargets from '@/components/dashboard/TotalTargets.vue'
import Technologies from '@/components/dashboard/technologies/Technologies.vue'
import ChartTabs from '@/components/dashboard/ChartTabs.vue'
import Notifications from '@/components/dashboard/notifications/Notifications.vue'

export default {
  components: {
    TotalTargets,
    Technologies,
    ChartTabs,
    Notifications
  },
  data() {
    return {
      totalTarget: {},
      technologies: [],
      agents: {}
    }
  },
  async created() {
    await this.getDashboardData()
    await this.getAlertsData()
    this.totalTarget = this.getTotalTarget
    this.technologies = this.getTechnologies
    this.agents = {
      totalHosts: this.getAgentsTotalHosts,
      agentsStopped: this.getStoppedAgents
    }
  },
  methods: {
    ...mapActions(['getDashboardData', 'getAlertsData'])
  },
  computed: {
    ...mapGetters([
      'getTotalTarget',
      'getTechnologies',
      'getAgentsTotalHosts',
      'getStoppedAgents'
    ])
  }
}
</script>

<style lang="scss" scoped></style>
