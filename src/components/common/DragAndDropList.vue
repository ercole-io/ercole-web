<template>
  <div class="row">
    <draggable
      :list="list"
      :disabled="!enabled"
      class="list-group"
      ghost-class="ghost"
      @start="dragging = true"
      @end="dragging = false"
    >
      <div class="list-group-item" v-for="(el, i) in list" :key="i">
        {{ i + 1 }} - {{ el }}
      </div>
    </draggable>

    <template class="col-3" :value="list" title="List" />
  </div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    draggable,
  },
  data() {
    return {
      enabled: true,
      dragging: false,
    }
  },
}
</script>
<style lang="scss" scoped>
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
  border: 1px dashed #dbdbdb;
}

.list-group {
  color: #363636;

  &:hover {
    border-color: #b5b5b5;
  }
}

.list-group-item {
  font-size: 0.75rem;
  padding: 5px 10px;
  border: 1px dashed #454545;
  margin-bottom: 2px;

  &:hover {
    cursor: grab;
  }
}
</style>
