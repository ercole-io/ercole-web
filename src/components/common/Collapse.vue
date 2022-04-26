<template>
  <div>
    <b-collapse
      class="card collapse-card"
      animation="slide"
      v-for="(collapse, index) of collapses"
      :aria-id="'collapse-' + index"
      :key="index"
      :open="status == index"
      @open="status = index"
    >
      <template #trigger="props">
        <div
          class="card-header collapse-header"
          role="button"
          :aria-controls="'contentIdForA11y5-' + index"
          :aria-expanded="props.open"
        >
          <p class="card-header-title collapse-title">
            {{ collapse }}
          </p>
          <a class="card-header-icon collapse-icon">
            <b-icon :icon="props.open ? 'menu-up' : 'menu-down'"></b-icon>
          </a>
        </div>
      </template>
      <div
        class="card-content collapse-content"
        :class="{ 'extra-padding': padding }"
      >
        <div class="content">
          <slot :name="collapse" />
        </div>
      </div>
    </b-collapse>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
    },
    id: {
      type: String,
    },
    isOpen: {
      type: Boolean,
      default: false,
    },
    padding: {
      type: Boolean,
      default: false,
    },
    margin: {
      type: Boolean,
      default: false,
    },
    collapses: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      status: this.isOpen,
    }
  },
}
</script>

<style lang="scss" scoped>
.collapse-card {
  box-shadow: none;
  margin-bottom: 15px;
}

.collapse-header {
  background-color: #ededed;
}

.collapse-title {
  margin-bottom: 0 !important;
  font-size: 0.8em;
  padding: 0.5rem 0.75rem;
}

.collapse-icon {
  padding: 0.5rem;
}

.collapse-content {
  padding: 0;

  .content {
    padding: 25px;
  }
}

.extra-padding {
  padding: 5px 10px 10px 10px;
}
.extra-margin {
  margin-bottom: 10px;
}
</style>
