<template>
  <div id="app">
    <component :is="layout">
      <Suspense>
        <Loading :isLoading="loadingStatus" :isFullPage="true" />
        <router-view
          v-if="isConfigLoaded"
          v-show="!loadingStatus"
          :key="$route.fullPath"
        />
      </Suspense>
    </component>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import Loading from '@/components/common/Loading.vue'
const default_layout = 'default'

export default {
  components: {
    Loading,
  },
  created() {
    this.fetchConfig().then(this.tryAutoLogin).then(this.offLoading)
  },
  methods: {
    ...mapActions(['tryAutoLogin', 'fetchConfig', 'offLoading']),
    ...mapMutations([
      'SET_IGNORE_LICENSE_ACTIVE_DB_TAB',
      'SET_LICENMSES_SUB_TAB_ACTIVE',
    ]),
  },
  computed: {
    ...mapGetters(['loadingStatus', 'isConfigLoaded']),
    layout() {
      return (this.$route.meta.layout || default_layout) + '-layout'
    },
  },
  watch: {
    $route() {
      this.SET_IGNORE_LICENSE_ACTIVE_DB_TAB(0)
      this.SET_LICENMSES_SUB_TAB_ACTIVE(0)
    },
  },
}
</script>

<style lang="scss"></style>
