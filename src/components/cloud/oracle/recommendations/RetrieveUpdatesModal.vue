<template>
  <div class="modal-card animation-content" style="width: auto">
    <header class="modal-card-head">
      <b class="modal-card-title">Retrieving Recommendations Updates</b>
    </header>
    <section class="modal-card-body is-flex">
      <div class="media" style="width: 100%; text-align: center">
        <div class="media-left">
          <span class="icon has-text-warning is-large">
            <i class="fa fa-sync-alt fa-2x"></i>
          </span>
        </div>
        <div class="media-content">
          <div>
            <p>Please wait... You can not stop this action!!!</p>
            <br />
            <b-progress></b-progress>
          </div>
        </div>
      </div>
    </section>
    <footer class="modal-card-foot"></footer>
  </div>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'

export default {
  beforeMount() {
    bus.$on('finishRetrieveUpdates', () => {
      this.$emit('close')
    })
  },
}
</script>

<style lang="scss" scoped></style>
