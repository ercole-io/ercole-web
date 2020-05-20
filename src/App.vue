<template>
  <div id="app">
    <b-loading :active.sync="isLoading"></b-loading>
    <component :is="layout">
      <router-view :key="$route.fullPath" />
    </component>
  </div>
</template>

<script>
const default_layout = 'default'

export default {
  computed: {
    layout() {
      return (this.$route.meta.layout || default_layout) + '-layout'
    },
    isLoading() {
      return this.$store.getters['loadingStatus']
    }
  }
}
</script>

<style lang="scss"></style>
