<template>
  <section>
    <div class="columns">
      <div class="column is-9">
        <div class="columns">
          <div class="column is-4">
            <TotalTargets />
          </div>
          <div class="column is-8">
            <Technologies />
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
            <Alerts />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { mapActions } from 'vuex'
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
  async beforeMount() {
    await this.getTechnologiesData()
      .then(() => {
        this.getDashboardData()
          .then(() => {
            this.getHosts() // Pre Load Hosts to cache info and save hostnames on vuex-persisted
            this.getClusters() // Pre load clusters to save clusternames on vuex-persisted
          })
          .then(() => {
            bus.$emit('loadDashboardComplete')
          })
      })
      .then(() => {
        bus.$emit('loadTechComplete')
      })

    await setInterval(() => {
      this.getHosts() // Update hosts automatically each hour
    }, 300000)
  },
  methods: {
    ...mapActions([
      'getDashboardData',
      'getHosts',
      'getClusters',
      'getTechnologiesData'
    ])
  }
}
</script>

<style lang="scss" scoped></style>
