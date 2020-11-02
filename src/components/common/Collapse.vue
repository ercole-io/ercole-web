<template>
  <b-collapse
    class="card collapse-card"
    animation="fade"
    :aria-id="id"
    :open="isOpen"
  >
    <div
      slot="trigger"
      slot-scope="props"
      class="card-header collapse-header"
      :class="{ 'extra-margin': margin }"
      role="button"
      :aria-controls="id"
    >
      <p class="card-header-title collapse-title">
        {{ title }}
      </p>
      <a class="card-header-icon collapse-icon">
        <b-icon :icon="props.open ? 'menu-up' : 'menu-down'"></b-icon>
      </a>
    </div>
    <div
      class="card-content collapse-content"
      :class="{ 'extra-padding': padding }"
    >
      <div class="content">
        <slot />
      </div>
    </div>
  </b-collapse>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    },
    id: {
      type: String
    },
    isOpen: {
      type: Boolean,
      default: false
    },
    padding: {
      type: Boolean,
      default: false
    },
    margin: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.collapse-card {
  box-shadow: none;
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
    padding: 5px;
  }
}

.extra-padding {
  padding: 5px 10px 10px 10px;
}
.extra-margin {
  margin-bottom: 10px;
}
</style>
