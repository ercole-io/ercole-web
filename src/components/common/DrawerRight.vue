<template>
  <b-sidebar
    type="is-white"
    :fullheight="true"
    :fullwidth="false"
    :overlay="false"
    :right="true"
    position="absolute"
    :open.sync="isOpenFilters"
  >
    <div
      class="has-background-light"
      :class="isOpenGlobalFilters ? 'drawer-wrapper-moved' : 'drawer-wrapper'"
    >
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
      isOpenFilters: false,
      isOpenGlobalFilters: false
    }
  },
  created() {
    bus.$on('openFilters', val => {
      this.isOpenFilters = val
    })

    bus.$on('isGlobalFilterOpened', val => {
      this.isOpenGlobalFilters = val
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
.drawer-position {
  padding: 100px 20px 90px 20px;
  border-left: 3px solid #679189;
  min-height: 100vh;
  position: relative;
}

.close-position {
  position: absolute;
  top: 90px;
  right: 5px;
}

.drawer-wrapper {
  @extend .drawer-position;

  .close {
    @extend .close-position;
  }
}

.drawer-wrapper-moved {
  padding-top: 150px;
  @extend .drawer-position;

  .close {
    top: 140px;
    @extend .close-position;
  }
}
</style>
