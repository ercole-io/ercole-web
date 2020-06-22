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
            <Notifications />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
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
  computed: {
    totalTarget() {
      return this.$store.getters['getTotalTarget']
    },
    technologies() {
      return this.$store.getters['getTechnologies']
    }
  }
}
</script>

<style lang="scss" scoped></style>
