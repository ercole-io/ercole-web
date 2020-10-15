<template>
  <div class="app">
    <appHeader />
    <appSidebar @collapsedSidebar="handleCollapsedSidebar" />
    <main
      class="main"
      :class="[
        {
          collapsed: isCollapsedSidebar,
          withFilters: globalFilters.isFilterOpened
        }
      ]"
    >
      <div class="layout">
        <appFilters
          v-if="
            $route.name !== 'licenses-agreement' && $route.name !== 'dashboard'
          "
        />
        <appBreadcrumb v-if="$route.name !== 'dashboard'" />
        <div class="content">
          <slot />
        </div>
      </div>
    </main>
    <appFooter />
  </div>
</template>

<script>
import { mapState } from 'vuex'
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
      isCollapsedSidebar: true
    }
  },
  methods: {
    handleCollapsedSidebar(value) {
      this.isCollapsedSidebar = value
    }
  },
  computed: {
    ...mapState(['globalFilters'])
  }
}
</script>

<style lang="scss">
.app {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  margin-top: 4px;
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
