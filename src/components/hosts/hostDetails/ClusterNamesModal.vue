<template>
  <div class="modal-card" style="width: 250px">
    <header class="modal-card-head">
      <p class="modal-card-title">Veritas Cluster Nodes</p>
    </header>
    <section class="modal-card-body">
      <a :href="`/details/${node}`" v-for="(node, i) in clusterNames" :key="i">
        {{ node }}
        <br />
      </a>
    </section>
    <footer class="modal-card-foot"></footer>
  </div>
</template>

<script>
export default {
  name: 'hosts-details-clustersnames-modal-component',
  props: {
    clusterNames: {
      type: [Array, Object],
      required: true,
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
