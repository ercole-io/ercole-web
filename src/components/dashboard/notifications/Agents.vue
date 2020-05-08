<template>
  <div>
    <header class="card-header">
      <p class="card-header-title" style="font-size: 0.9em">{{ title }}</p>
    </header>
    <div class="card-content body">
      <template>
        <div class="agents">
          <span>Total hosts:</span>
          <span class="has-text-weight-bold">15.846</span>
        </div>
        <div class="agents">
          <span>Agents that are stopped:</span>
          <span class="has-text-weight-bold">22 (from 540,in.)</span>
        </div>
      </template>
    </div>
    <footer class="card-footer">
      <b-button href="#" class="is-small is-primary is-radiusless" expanded>
        Inspect
      </b-button>
    </footer>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  font-size: 0.9em !important;
}

.body {
  font-size: 0.75rem;
  padding-top: 0.5rem;
  padding-bottom: 0.75rem;
}

.agents {
  display: flex;
  justify-content: space-between;
}
</style>
