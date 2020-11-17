<template>
  <main
    class="main"
    :class="[
      {
        collapsed: isCollapsedSidebar,
        withFilters: globalFilters.isFilterOpened
      }
    ]"
  >
    <slot />
  </main>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    isCollapsedSidebar: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    ...mapState(['globalFilters'])
  }
}
</script>

<style lang="scss" scoped></style>
