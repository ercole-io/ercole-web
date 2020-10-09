<template>
  <div id="app">
    <component :is="layout">
      <Suspense>
        <b-loading :active.sync="loadingStatus" />
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
import { formatDatepickerDate } from '@/helpers/helpers.js'
const default_layout = 'default'

export default {
  beforeCreate() {
    const filters = {}
    if (!localStorage.getItem('globalFilters')) {
      filters.location = null
      filters.environment = null
      filters.date = formatDatepickerDate()
      localStorage.setItem('globalFilters', JSON.stringify(filters))
    }
  },
  created() {
    this.fetchConfig()
      .then(this.tryAutoLogin)
      .then(this.offLoading)
  },
  methods: {
    ...mapActions(['tryAutoLogin', 'fetchConfig', 'offLoading'])
  },
  computed: {
    ...mapGetters(['loadingStatus', 'isConfigLoaded']),
    layout() {
      return (this.$route.meta.layout || default_layout) + '-layout'
    }
  }
}
</script>

<style lang="scss"></style>
