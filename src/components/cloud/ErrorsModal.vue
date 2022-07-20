<template>
  <div class="modal-card animation-content" style="width: auto">
    <header class="modal-card-head">
      <b class="modal-card-title">Recommendations Errors</b>
    </header>
    <section class="modal-card-body">
      <div class="media" v-for="(err, i) in dataErrors" :key="i">
        <div class="media-left">
          <span class="icon has-text-danger is-small">
            <i class="fa fa-exclamation"></i>
          </span>
        </div>
        <div class="media-content is-size-7">
          <p>
            <b>{{ err.category }}</b> - {{ getDate(err.createdAt) }}
          </p>
          <p><b>Profile ID:</b> {{ err.profileID }}</p>
          <p>{{ err.error }}</p>
        </div>
      </div>
    </section>
    <footer class="modal-card-foot"></footer>
  </div>
</template>

<script>
import formatDateTime from '@/filters/formatDateTime.js'

export default {
  props: ['dataErrors'],
  methods: {
    getDate(date) {
      return formatDateTime(date)
    },
  },
}
</script>

<style lang="scss" scoped></style>
