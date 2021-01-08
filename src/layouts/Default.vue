<template>
  <div class="app">
    <appHeader />
    <appSidebar @collapsedSidebar="handleCollapsedSidebar" />
    <appMain :isCollapsedSidebar="isCollapsedSidebar">
      <div class="layout">
        <appFilters />
        <appBreadcrumb />
        <div class="content">
          <slot />
        </div>
      </div>
    </appMain>
    <appFooter />
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Filters from '@/components/Filters.vue'
import SidebarMenu from '@/components/Sidebar.vue'
import Main from '@/components/Main.vue'
import Breadcrumb from '@/components/common/Breadcrumb.vue'
import Footer from '@/components/Footer.vue'

export default {
  components: {
    appHeader: Header,
    appFilters: Filters,
    appSidebar: SidebarMenu,
    appMain: Main,
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
  }
}
</script>

<style lang="scss">
.app {
  display: flex;
  min-height: calc(100vh - 52px);
  flex-direction: column;
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
