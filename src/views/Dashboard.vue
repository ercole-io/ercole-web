<template>
  <section>
    <div class="columns">
      <div class="column is-9">
        <div class="columns">
          <div class="column is-6">
            <Technologies />
          </div>
          <div class="column is-6">
            <CloudObjects />
          </div>
        </div>
        <div class="columns">
          <div class="column is-12">
            <DashboardTabs />
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
import Technologies from '@/components/dashboard/technologies/Technologies.vue'
import CloudObjects from '@/components/dashboard/cloud/CloudObjects.vue'
import DashboardTabs from '@/components/dashboard/DashboardTabs.vue'
import Alerts from '@/components/dashboard/alerts/Alerts.vue'

export default {
  components: {
    Technologies,
    CloudObjects,
    DashboardTabs,
    Alerts,
  },
  beforeMount() {
    this.getVersion()
    this.getDbConnection()
    this.getDashboardData()
      .then(() => {
        bus.$emit('loadDashboardComplete')
      })
      .then(() => {
        bus.$emit('loadTechComplete')
      })
    this.getTechnologiesData()
    this.getOracleCloudObjects()

    this.getGlobalFiltersLocations()
    this.getGlobalFiltersEnvironments()
  },
  methods: {
    ...mapActions([
      'getDashboardData',
      'getTechnologiesData',
      'getGlobalFiltersLocations',
      'getGlobalFiltersEnvironments',
      'getOracleCloudObjects',
      'getDbConnection',
      'getVersion',
    ]),
  },
}
</script>

<style lang="scss" scoped></style>
