<template>
  <b-navbar type="is-dark">
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="'/'">
        <img src="@/assets/ercole-logo.png" alt="Ercole" />
      </b-navbar-item>
    </template>

    <template slot="end">
      <p class="welcome">Benvenuto, Ricardo Maiolini</p>
      <b-navbar-item tag="div">
        <div class="buttons">
          <b-button type="is-light">Logout</b-button>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.welcome {
  height: 52px;
  line-height: 52px;
}
</style>
