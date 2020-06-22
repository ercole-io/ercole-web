<template>
  <div id="app">
    <component :is="layout">
      <Suspense>
        <b-loading :active.sync="isLoading"></b-loading>
        <router-view v-show="!isLoading" :key="$route.fullPath" />
      </Suspense>
    </component>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
const default_layout = 'default'

export default {
  created() {
    this.tryAutoLogin()
  },
  methods: {
    ...mapActions(['tryAutoLogin'])
  },
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
