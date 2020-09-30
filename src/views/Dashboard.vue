<template>
  <section>
    <div class="columns">
      <div class="column is-9">
        <div class="columns">
          <div class="column is-4">
            <TotalTargets :totalTarget="totalTarget" />
          </div>
          <div class="column is-8">
            <Technologies :technologies="technologies" />
          </div>
        </div>
        <div class="columns">
          <div class="column is-12">
            <LicensesChart />
          </div>
        </div>
      </div>
      <div class="column is-3">
        <div class="columns">
          <div class="column is-12">
            <Alerts :licenses="licensesAlerts" :engines="enginesAlerts" />
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
// import ChartTabs from '@/components/dashboard/ChartTabs.vue'
import LicensesChart from '@/components/dashboard/LicenseChart.vue'
import Alerts from '@/components/dashboard/alerts/Alerts.vue'

export default {
  components: {
    TotalTargets,
    Technologies,
    // ChartTabs,
    LicensesChart,
    Alerts
  },
  data() {
    return {
      totalTarget: {},
      technologies: [],
      licensesAlerts: {},
      enginesAlerts: {}
    }
  },
  async beforeMount() {
    await this.getDashboardData()

    this.totalTarget = this.getTotalTarget
    this.technologies = this.getTechnologies
  },
  methods: {
    ...mapActions(['getDashboardData'])
  },
  computed: {
    ...mapGetters(['getTotalTarget', 'getTechnologies'])
  }
}
</script>

<style lang="scss" scoped></style>
