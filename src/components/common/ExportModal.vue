<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title">{{ downloadType }}</p>
    </header>
    <section class="modal-card-body">
      <p class="mb-2">{{ msgTxt }}</p>
      <b-progress type="is-primary" v-if="downloading === 0" />
      <b-progress
        v-else
        type="is-primary"
        :value="downloading"
        show-value
        format="percent"
      />
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
  data() {
    return {
      downloading: 0
    }
  },
  beforeMount() {
    bus.$on('callCloseModal', () => {
      setTimeout(() => {
        this.$emit('close')
      }, 500)
    })

    bus.$on('updateDownloadPerc', val => {
      if (val) {
        this.downloading = val
      }
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
