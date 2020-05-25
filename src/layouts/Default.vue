<template>
  <div class="app">
    <appHeader />
    <appFilters />
    <main class="main">
      <div class="columns">
        <div class="column is-2">
          <appMenu />
        </div>
        <div class="column is-10">
          <div class="content">
            <slot />
          </div>
        </div>
      </div>
    </main>
    <appFooter />
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Filters from '@/components/Filters.vue'
import Menu from '@/components/Menu.vue'
import Footer from '@/components/Footer.vue'

export default {
  components: {
    appHeader: Header,
    appFilters: Filters,
    appMenu: Menu,
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
