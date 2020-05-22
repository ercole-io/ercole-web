<template>
  <b-navbar type="is-dark">
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="'/'">
        <img src="@/assets/images/ercole-logo.png" alt="Ercole" />
      </b-navbar-item>
    </template>

    <template slot="end">
      <b-navbar-item tag="div">
        <Filters />
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
import Filters from '@/components/common/Filters.vue'

export default {
  components: {
    Filters
  }
}
</script>

<style lang="scss" scoped></style>
