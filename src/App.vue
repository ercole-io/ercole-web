<template>
  <div id="app">
    <appHeader />
    <div class="columns">
      <div class="column is-one-fifth">
        <appMenu />
      </div>
      <div class="column">
        <router-view />
      </div>
    </div>
    <appFooter />
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
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

<style lang="scss"></style>
