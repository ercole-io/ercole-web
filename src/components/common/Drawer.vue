<template>
  <b-sidebar
    type="is-white"
    :fullheight="true"
    :fullwidth="false"
    :overlay="false"
    :right="true"
    position="fixed"
    :open.sync="isOpenFilters"
  >
    <div class="has-background-light drawer-wrapper">
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
import { mapMutations } from 'vuex'
import { bus } from '@/helpers/eventBus.js'

export default {
  data() {
    return {
      isOpenFilters: false,
    }
  },
  created() {
    bus.$on('openFilters', (val) => {
      if (!this.isOpenFilters && !val) {
        this.isOpenFilters = true
      } else {
        this.isOpenFilters = val
      }

      if (val) {
        this.SET_OPEN_FILTERS(this.isOpenFilters)
      }
    })
  },
  methods: {
    ...mapMutations(['SET_OPEN_FILTERS']),
    closeFilters() {
      this.isOpenFilters = false
      bus.$emit('closeFilters', this.isOpenFilters)
      this.SET_OPEN_FILTERS(this.isOpenFilters)
    },
  },
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
</style>
