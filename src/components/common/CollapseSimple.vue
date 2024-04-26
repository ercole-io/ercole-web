<template>
  <b-collapse animation="slide" class="card mt-2 mb-4" :open="isOpen">
    <template #trigger="props">
      <div
        class="panel-heading card-header py-0 px-0 is-size-6"
        :class="callapsibleHeadColors"
        role="button"
        :aria-controls="collapseID"
      >
        <p
          class="card-header-title mb-0"
          :class="callapsibleHeadColors"
          v-html="highlight(collapseTitle)"
        />
        <a class="card-header-icon py-2 px-2">
          <b-icon :icon="props.open ? 'menu-up' : 'menu-down'"> </b-icon>
        </a>
      </div>
    </template>
    <slot />
  </b-collapse>
</template>

<script>
import HighlightSearchMixin from '@/mixins/highlightSearch.js'

export default {
  name: 'commom-collapse-simple-component',
  mixins: [HighlightSearchMixin],
  props: {
    isOpen: {
      type: Boolean,
      default: true,
    },
    collapseID: {
      type: String,
      required: true,
    },
    collapseTitle: {
      type: String,
      required: true,
    },
    callapsibleHeadColors: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped></style>
