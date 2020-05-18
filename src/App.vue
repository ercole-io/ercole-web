<template>
  <div id="app">
    <appHeader />
    <main class="main">
      <div class="columns">
        <div class="column is-2">
          <appMenu />
        </div>
        <div class="column is-10">
          <router-view :key="$route.fullPath" class="content" />
        </div>
      </div>
    </main>
    <appFooter />
  </div>
</template>

<script>
import Header from '@/components/header/Header.vue'
import Menu from '@/components/Menu.vue'
import Footer from '@/components/Footer.vue'

export default {
  components: {
    appHeader: Header,
    appMenu: Menu,
    appFooter: Footer
  }
}
</script>

<style lang="scss">
@import '@/styles/styles.scss';

#app {
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
