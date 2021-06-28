<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title">{{ downloadType }}</p>
    </header>
    <section class="modal-card-body">
      <p class="mb-2">{{ msgTxt }}</p>
      <b-progress type="is-primary"></b-progress>
    </section>
    <footer class="modal-card-foot">
      <b-button type="is-danger" :label="btText" @click="CancelRequest" />
    </footer>
  </div>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'

export default {
  props: {
    downloadType: {
      type: String
    },
    msgTxt: {
      type: String
    },
    btText: {
      type: String
    }
  },
  beforeMount() {
    bus.$on('callCloseModal', () => {
      setTimeout(() => {
        this.$emit('close')
      }, 500)
    })
  },
  methods: {
    CancelRequest() {
      this.$emit('close')
      bus.$emit('callCancelExport')
    }
  }
}
</script>

<style lang="scss" scoped></style>
