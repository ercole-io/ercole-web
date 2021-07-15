<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title">{{ downloadType }}</p>
    </header>
    <section class="modal-card-body"></section>
    <footer class="modal-card-foot">
      <!-- <b-button type="is-danger" :label="btText" @click="CancelRequest" /> -->
    </footer>
  </div>
</template>

<script>
export default {
  props: {
    downloadType: {
      type: String
    }
  }
}
</script>

<style lang="scss" scoped></style>
