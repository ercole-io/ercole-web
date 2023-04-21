<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title">
        {{ associatedType }} Associated <br />
        <span class="is-size-7">
          MsSqlServer Contract ID: {{ contractID }}
        </span>
      </p>
    </header>
    <section class="modal-card-body">
      <p v-for="(data, index) in contractData" :key="index">
        <HostLink :hostname="data" />
      </p>
    </section>
    <footer class="modal-card-foot"></footer>
  </div>
</template>

<script>
import TooltipMixin from '@/mixins/tooltipMixin.js'
import HostLink from '@/components/common/Table/HostLink.vue'

export default {
  name: 'licenses-contracts-microsoft-associatedmodal-component',
  mixins: [TooltipMixin],
  components: {
    HostLink,
  },
  props: {
    associatedType: {
      type: String,
      required: true,
    },
    contractData: {
      type: Array,
      required: true,
    },
    contractID: {
      type: [Number, String],
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
