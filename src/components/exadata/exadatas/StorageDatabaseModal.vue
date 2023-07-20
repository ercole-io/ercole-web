<template>
  <div class="modal-card" style="width: auto; min-width: 650px">
    <header class="modal-card-head">
      <p class="modal-card-title is-size-4 has-text-weight-semibold">
        Database Info
      </p>
    </header>
    <section class="modal-card-body">
      <div
        class="is-flex is-justify-content-space-around is-align-content-center"
      >
        <CardStats
          class="card-stat-style"
          cardStatTitle="Name"
          :cardStatValue="data.dbName || '-'"
        />
        <CardStats
          class="card-stat-style"
          cardStatTitle="Type"
          :cardStatValue="data.type || '-'"
        />
        <CardStats
          class="card-stat-style"
          cardStatTitle="Cell"
          :cardStatValue="data.cell || '-'"
        />
      </div>
      <div
        class="is-flex is-justify-content-space-around is-align-content-center"
      >
        <CardStats
          class="card-stat-style"
          cardStatTitle="Flash Cache Limit"
          :cardStatValue="data.flashCacheLimit || '-'"
        />
        <CardStats
          class="card-stat-style"
          cardStatTitle="IO RM Share"
          :cardStatValue="data.iormShare || '-'"
        />
        <CardStats
          class="card-stat-style"
          cardStatTitle="Last IO Req"
          :cardStatValue="data.lastIOReq ? formatDate(data.lastIOReq) : '-'"
        />
      </div>
    </section>
    <footer class="modal-card-foot"></footer>
  </div>
</template>

<script>
import FormatDateTime from '@/filters/formatDateTime.js'
import CardStats from '@/components/common/CardStats.vue'

export default {
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    hostname: {
      type: String,
      default: '',
    },
  },
  components: {
    CardStats,
  },
  methods: {
    formatDate(date) {
      return FormatDateTime(date)
    },
  },
}
</script>

<style lang="scss" scoped>
.modal-card-title {
  font-size: 1.2rem;
}

.modal-card-body {
  font-size: 1rem;
  cursor: default;
}

.card-stat-style {
  width: 100%;
  padding: 0.5rem;
}
</style>
