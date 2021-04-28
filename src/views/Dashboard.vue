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
    await this.getDashboardData().then(() => {
      this.$store.dispatch('getHosts') // Pre Load Hosts to cache info and save hostnames on vuex-persisted
      this.$store.dispatch('getClusters') // Pre load clusters to save clusternames on vuex-persisted
    })

    // setInterval(() => {
    //   this.$store.dispatch('getHosts') // Update hosts automatically each hour
    // }, 300000)
  },
  methods: {
    ...mapActions(['getDashboardData'])
  }
}
</script>

<style lang="scss" scoped></style>
