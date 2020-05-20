<template>
  <b-navbar type="is-dark">
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="'/'">
        <img src="@/assets/images/ercole-logo.png" alt="Ercole" />
      </b-navbar-item>
    </template>

    <template slot="end">
      <b-navbar-item tag="div">
        <b-field position="is-centered" type="is-dark">
          <b-input
            size="is-small"
            placeholder="Global Search"
            type="search"
            icon="magnify"
          ></b-input>
          <p class="control">
            <b-button size="is-small is-primary">Search</b-button>
          </p>
        </b-field>
      </b-navbar-item>

      <LocaleSwitcher />
    </template>
  </b-navbar>
</template>

<script>
import LocaleSwitcher from '@/components/LocaleSwitcher.vue'

export default {
  components: {
    LocaleSwitcher
  }
}
</script>

<style lang="scss" scoped></style>
