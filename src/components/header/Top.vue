<template>
  <section class="header-top has-background-light">
    <div class="start">
      <p>Roberto Benigni, Operator</p>
    </div>
    <div class="end">
      <b-switch size="is-small">Automatic Data Refresh</b-switch>
      <b-button @click="logout" type="is-text" class="logout">Logout</b-button>
    </div>
  </section>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch('logout')
    }
  }
}
</script>

<style lang="scss" scoped>
.header-top {
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  padding: 0 0.75rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;

  .start,
  .end {
    display: flex;
    align-items: center;
  }

  .logout {
    font-size: 14px;
    text-decoration: none;
    margin-left: 20px;
  }
}
</style>
