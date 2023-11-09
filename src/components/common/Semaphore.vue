<template>
  <div class="block">
    <b-icon
      pack="fas"
      icon="circle"
      :type="setColor === 'red' ? 'is-danger' : ''"
      :size="setSize"
      :class="{ 'is-clickable': setColor === 'red' }"
      @click.native="isModalActive = true && setColor === 'red'"
    />

    <b-icon
      pack="fas"
      icon="circle"
      :type="setColor === 'yellow' ? 'is-warning' : ''"
      :size="setSize"
      :class="{ 'is-clickable': setColor === 'yellow' }"
      @click.native="isModalActive = true && setColor === 'yellow'"
    />

    <b-icon
      pack="fas"
      icon="circle"
      :type="setColor === 'green' ? 'is-primary' : ''"
      :size="setSize"
      :class="{ 'is-clickable': setColor === 'green' }"
      @click.native="isModalActive = true && setColor === 'green'"
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
    setSize: {
      type: String,
      default: 'is-small',
    },
  },
  data() {
    return {
      isModalActive: false,
    }
  },
  watch: {
    isModalActive(val) {
      if (val) {
        bus.$emit('semaphoreModal', val)
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
