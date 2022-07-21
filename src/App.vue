<template>
  <div id="app">
    <b-tag
      type="is-danger"
      class="db-connected animate__animated animate__fadeInDown"
      v-if="!isDbConnected"
    >
      Database Not Connected!
    </b-tag>

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
    ...mapGetters(['loadingStatus', 'isConfigLoaded', 'isDbConnected']),
    layout() {
      return (this.$route.meta.layout || default_layout) + '-layout'
    },
  },
}
</script>

<style lang="scss">
.db-connected {
  position: absolute;
  top: 18px;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99;
}
</style>
