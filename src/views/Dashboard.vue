<template>
  <section>
    <div class="columns">
      <div class="column is-full" style="background-color: lightsalmon">
        <Filters />
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <div class="columns">
          <div class="column is-4" style="background-color: lightblue">
            <TotalTargets />
          </div>
          <div class="column" style="background-color: lightgreen">
            Technologies component
          </div>
        </div>
        <div class="columns">
          <div class="column" style="background-color: lightseagreen">
            Tabs component
          </div>
        </div>
      </div>
      <div class="column is-3" style="background-color: lightskyblue">
        <div class="columns">
          <div class="column">
            Notifications component
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Filters from '@/components/dashboard/Filters.vue'
import TotalTargets from '@/components/dashboard/TotalTargets.vue'

export default {
  components: {
    Filters,
    TotalTargets
  }
}
</script>

<style lang="scss" scoped></style>
