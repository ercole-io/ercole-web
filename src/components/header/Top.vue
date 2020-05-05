<template>
  <section class="header-top is-clearfix has-background-light">
    <p class="is-pulled-left">Roberto Benigni, Operator</p>
    <div class="field refresh">
      <b-switch size="is-small">Automatic Data Refresh</b-switch>
    </div>
    <div class="is-pulled-right">
      <a href="#">Logout</a>
    </div>
  </section>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.header-top {
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  padding: 0 0.75rem;
  position: relative;

  .refresh {
    position: absolute;
    right: 100px;
    top: 0;
  }
}
</style>
