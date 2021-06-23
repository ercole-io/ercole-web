<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title">{{ downloadType }} in Progress</p>
    </header>
    <section class="modal-card-body">
      <p class="mb-2">This may take a few time, please wait...</p>
      <b-progress type="is-primary"></b-progress>
    </section>
    <footer class="modal-card-foot">
      <b-button
        type="is-danger"
        label="Cancel Request"
        @click="CancelRequest"
      />
    </footer>
  </div>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'

export default {
  props: {
    downloadType: {
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
