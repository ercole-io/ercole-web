<template>
  <div class="app">
    <appHeader />
    <appSidebar @collapsedSidebar="handleCollapsedSidebar" />
    <main class="main" :class="[{ collapsed: isCollapsedSidebar }]">
      <!-- { withFilters: isFiltersOpened }, -->
      <div class="layout">
        <!-- <appFilters @filters="handleIsFilters" /> -->
        <appBreadcrumb v-if="this.$route.name !== 'dashboard'" />
        <div class="content">
          <!-- <appTitle
            v-if="
              this.$route.name !== 'dashboard' &&
                this.$route.name !== 'hosts-details'
            "
          /> -->
          <slot />
        </div>
      </div>
    </main>
    <appFooter />
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
// import Filters from '@/components/Filters.vue'
// import PageTitle from '@/components/common/PageTitle.vue'
import SidebarMenu from '@/components/Sidebar.vue'
import Breadcrumb from '@/components/common/Breadcrumb.vue'
import Footer from '@/components/Footer.vue'

export default {
  components: {
    appHeader: Header,
    // appFilters: Filters,
    // appTitle: PageTitle,
    appSidebar: SidebarMenu,
    appBreadcrumb: Breadcrumb,
    appFooter: Footer
  },
  data() {
    return {
      isFiltersOpened: false,
      isCollapsedSidebar: true
    }
  },
  methods: {
    handleIsFilters(value) {
      this.isFiltersOpened = value
    },
    handleCollapsedSidebar(value) {
      this.isCollapsedSidebar = value
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
  padding: 0 0 0 250px;

  &.collapsed {
    padding-left: 50px;
  }
}

.layout {
  padding: 0;

  &.withFilters {
    padding-top: 72px;
  }
}

.content {
  padding: 20px;
}
</style>
