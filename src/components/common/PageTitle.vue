<template>
  <div class="page-title title is-6">
    <div>
      {{ pageTitle }}
    </div>
    <div>
      <slot />
    </div>
  </div>
</template>

<script>
import dynamicTitle from '@/mixins/dynamicTitle.js'

export default {
  name: 'commom-pagetitle-component',
  mixins: [dynamicTitle],
  computed: {
    pageTitle() {
      return this.dynamicTitle ? this.dynamicTitle : this.$route.meta.label
    },
  },
}
</script>

<style lang="scss" scoped>
.page-title {
  width: 100%;
  padding-bottom: 5px;
  border-bottom: 1px solid #ccc;
  margin-bottom: 1rem;
  padding-left: 5px;
  display: flex;
  justify-content: space-between;
}
</style>
