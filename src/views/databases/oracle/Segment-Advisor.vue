<template>
  <section></section>
</template>

<script>
export default {
  async beforeMount() {
    await this.$store.dispatch('getSegmentAdvisor')
  }
}
</script>

<style lang="scss" scoped></style>
