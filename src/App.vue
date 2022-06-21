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
import { mapActions, mapGetters } from 'vuex'
import Loading from '@/components/common/Loading.vue'
const default_layout = 'default'

export default {
  components: {
    Loading,
  },
  created() {
    this.fetchConfig().then(this.offLoading)
  },
  methods: {
    ...mapActions(['tryAutoLogin', 'fetchConfig', 'offLoading']),
  },
  computed: {
    ...mapGetters(['loadingStatus', 'isConfigLoaded']),
    layout() {
      return (this.$route.meta.layout || default_layout) + '-layout'
    },
  },
}
</script>

<style lang="scss"></style>
