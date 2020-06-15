<template>
  <div class="app">
    <appHeader />
    <appFilters @filters="handleIsFilters" />
    <appSidebar />
    <main class="main" :class="{ withFilters: isFiltersOpened }">
      <div class="content">
        <appBreadcrumb v-if="this.$route.name !== 'dashboard'" />
        <slot />
      </div>
    </main>
    <appFooter />
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Filters from '@/components/Filters.vue'
import SidebarMenu from '@/components/Sidebar.vue'
import Breadcrumb from '@/components/common/Breadcrumb.vue'
import Footer from '@/components/Footer.vue'

export default {
  components: {
    appHeader: Header,
    appFilters: Filters,
    appSidebar: SidebarMenu,
    appBreadcrumb: Breadcrumb,
    appFooter: Footer
  },
  data() {
    return {
      isFiltersOpened: false
    }
  },
  methods: {
    handleIsFilters(value) {
      this.isFiltersOpened = value
    }
  }
}
</script>

<style lang="scss">
.app {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  margin-top: 5px;
}

.main {
  flex: 1;
  padding: 0.75rem;
  padding-left: 75px;
  padding-top: 25px;

  &.withFilters {
    padding-top: 72px;
  }
}

.content {
  padding: 0.75rem;
}
</style>
