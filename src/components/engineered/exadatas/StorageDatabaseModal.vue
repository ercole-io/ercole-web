<template>
  <div class="modal-card" style="width: 650px">
    <header class="modal-card-head">
      <p class="modal-card-title is-size-6">
        Database Info:
        <span class="has-text-weight-bold is-size-5">{{ hostname }}</span>
      </p>
    </header>
    <section class="modal-card-body">
      <div class="is-flex is-justify-content-space-between">
        <CardStats cardStatTitle="Name" :cardStatValue="data.dbName || '-'" />
        <CardStats cardStatTitle="Type" :cardStatValue="data.type || '-'" />
        <CardStats cardStatTitle="Cell" :cardStatValue="data.cell || '-'" />
        <CardStats
          cardStatTitle="Flash Cache Limit"
          :cardStatValue="data.flashCacheLimit || '-'"
        />
        <CardStats
          cardStatTitle="IO RM Share"
          :cardStatValue="data.iormShare || '-'"
        />
        <CardStats
          cardStatTitle="Last IO Req"
          :cardStatValue="formatDate(data.lastIOReq) || '-'"
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
</style>
