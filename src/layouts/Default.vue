<template>
  <div class="app">
    <appHeader />
    <appFilters />
    <main class="main">
      <div class="content">
        <slot />
      </div>
    </main>
    <appFooter />
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Filters from '@/components/Filters.vue'
import Footer from '@/components/Footer.vue'

export default {
  components: {
    appHeader: Header,
    appFilters: Filters,
    appFooter: Footer
  }
}
</script>

<style lang="scss">
.app {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

.main {
  flex: 1;
  padding: 0.75rem;
}

.content {
  padding: 0.75rem;
}
</style>
