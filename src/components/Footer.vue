<template>
  <footer class="footer has-background-grey-lighter">
    <div class="content has-text-centered">
      <p data-footer>
        {{ version }}
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'footer-component',
  data() {
    return {
      version: `Ercole 2.0 © ${new Date().getFullYear()} Sorint.lab S.p.A.`,
    }
  },
}
</script>

<style lang="scss" scoped>
.footer {
  padding: 0 1.5rem;
  z-index: 52;
  margin-left: 50px;
}
</style>
