<template>
  <section>
    <div class="columns">
      <div class="column">
        <Filters />
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <div class="columns">
          <div class="column is-4">
            <TotalTargets />
          </div>
          <div class="column">
            <Technologies />
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <Tabs />
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
import Filters from '@/components/dashboard/Filters.vue'
import TotalTargets from '@/components/dashboard/TotalTargets.vue'
import Technologies from '@/components/dashboard/Technologies.vue'
import Tabs from '@/components/dashboard/Tabs.vue'
import Notifications from '@/components/dashboard/Notifications.vue'

export default {
  components: {
    Filters,
    TotalTargets,
    Technologies,
    Tabs,
    Notifications
  }
}
</script>

<style lang="scss" scoped></style>
