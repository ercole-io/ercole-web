<template>
  <section>
    <div class="columns">
      <div class="column is-9">
        <div class="columns">
          <div class="column is-12">
            <Technologies />
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
import DashboardTabs from '@/components/dashboard/DashboardTabs.vue'
import Alerts from '@/components/dashboard/alerts/Alerts.vue'

export default {
  components: {
    Technologies,
    DashboardTabs,
    Alerts,
  },
  data() {
    return {
      setInterval: null,
    }
  },
  beforeMount() {
    this.getDashboardData()
      .then(() => {
        bus.$emit('loadDashboardComplete')
      })
      .then(() => {
        bus.$emit('loadTechComplete')
      })
    this.getTechnologiesData()

    this.getGlobalFiltersLocations()
    this.getGlobalFiltersEnvironments()
  },
  methods: {
    ...mapActions([
      'getDashboardData',
      'getTechnologiesData',
      'getGlobalFiltersLocations',
      'getGlobalFiltersEnvironments',
    ]),
  },
  beforeDestroy() {
    clearInterval(this.setInterval)
  },
}
</script>

<style lang="scss" scoped></style>
