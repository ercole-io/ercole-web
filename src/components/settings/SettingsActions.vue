<template>
  <div class="is-flex is-flex-direction-row is-justify-content-flex-end mb-3">
    <b-button
      type="is-danger"
      size="is-small"
      @click.prevent="reset"
      class="mr-2"
    >
      Restore
    </b-button>

    <b-button type="is-custom-primary" size="is-small" @click.prevent="action">
      Save
    </b-button>
  </div>
</template>

<script>
import settings from '@/mixins/settings/settings.js'

export default {
  mixins: [settings],
  props: {
    reset: {
      type: Function,
      required: true,
    },
    action: {
      type: Function,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped></style>
