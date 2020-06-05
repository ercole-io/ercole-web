<template>
  <h1 class="page-title">
    <div>
      {{ pageTitle }} <span v-if="dynamicTitle">- {{ dynamicTitle }}</span>
    </div>
    <div>
      <slot />
    </div>
  </h1>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'

export default {
  data() {
    return {
      dynamicTitle: ''
    }
  },
  created() {
    bus.$on('dynamicTitle', value => {
      this.dynamicTitle = value
    })
  },
  computed: {
    pageTitle() {
      return this.$route.meta.label
    }
  },
  watch: {
    $route() {
      this.dynamicTitle = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.page-title {
  width: 100%;
  font-size: 1.2em;
  padding-bottom: 5px;
  border-bottom: 1px solid #ccc;
  margin-bottom: 1rem;
  padding-left: 5px;
  display: flex;
  justify-content: space-between;

  span {
    font-size: 0.8em;
    font-weight: 500;
  }
}
</style>
