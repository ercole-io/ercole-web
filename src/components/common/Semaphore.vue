<template>
  <div class="block">
    <b-icon
      pack="fas"
      icon="circle"
      :type="setColor === 'red' ? 'is-danger' : ''"
      size="is-small"
      :class="{ 'is-clickable': setColor === 'red' }"
      @click.native="activateModal() && setColor === 'red'"
    />

    <b-icon
      pack="fas"
      icon="circle"
      :type="setColor === 'yellow' ? 'is-warning' : ''"
      size="is-small"
      :class="{ 'is-clickable': setColor === 'yellow' }"
      @click.native="activateModal() && setColor === 'yellow'"
    />

    <b-icon
      pack="fas"
      icon="circle"
      :type="setColor === 'green' ? 'is-primary' : ''"
      size="is-small"
      :class="{ 'is-clickable': setColor === 'green' }"
      @click.native="activateModal() && setColor === 'green'"
    />
  </div>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'

export default {
  name: 'commom-semaphore-component',
  props: {
    setColor: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      isModalActive: false,
    }
  },
  methods: {
    activateModal() {
      bus.$emit('semaphoreModal', true)
    },
  },
}
</script>

<style lang="scss" scoped></style>
