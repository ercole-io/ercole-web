<template>
  <div>
    <header class="card-header">
      <p class="card-header-title" style="font-size: 0.9em">{{ title }}</p>
    </header>
    <div class="card-content body">
      <template>
        <span class="is-size-5 is-pulled-left">
          <b-icon type="is-info" pack="fas" icon="exclamation"></b-icon>
        </span>
        <p style="margin-left: 20px">
          Enterprise Data Quality Real-Time Processing for Data Integration
        </p>
      </template>
    </div>
    <footer class="card-footer">
      <b-button href="#" class="is-small is-primary is-radiusless" expanded>
        View
      </b-button>
      <b-button href="#" class="is-small is-primary is-radiusless" expanded>
        Close
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
</style>
