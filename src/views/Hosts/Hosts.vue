<template>
  <section>
    <Filters />
    <router-view :key="$route.fullPath" />
  </section>
</template>

<script>
import Filters from '@/components/common/Filters.vue'

export default {
  components: {
    Filters
  }
}
</script>

<style lang="scss" scoped></style>
