<template>
  <b-sidebar
    type="is-white"
    :fullheight="true"
    :fullwidth="false"
    :overlay="false"
    :right="true"
    position="absolute"
    v-model="isOpenFilters"
  >
    <div class="drawer-wrapper has-background-light">
      <b-button
        size="is-small"
        type="is-dark"
        inverted
        icon-pack="fas"
        icon-right="times"
        class="close"
        @click="closeFilters"
      />

      <slot name="drawer-content" />
    </div>
  </b-sidebar>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'

export default {
  data() {
    return {
      isOpenFilters: false
    }
  },
  created() {
    bus.$on('openFilters', val => {
      this.isOpenFilters = val
    })
  },
  methods: {
    closeFilters() {
      this.isOpenFilters = false
      bus.$emit('closeFilters', this.isOpenFilters)
    }
  }
}
</script>

<style lang="scss" scoped>
.drawer-wrapper {
  padding: 100px 20px 60px 20px;
  border-left: 3px solid #679189;
  height: 100%;
  position: relative;

  .close {
    position: absolute;
    top: 90px;
    right: 5px;
  }
}
</style>
