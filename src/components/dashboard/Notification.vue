<template>
  <div class="card notification">
    <header class="card-header">
      <p class="card-header-title" style="font-size: 0.9em">{{ title }}</p>
    </header>
    <div class="card-content body">
      <template v-if="type === 'agents'">
        <div class="agents">
          <span>Total hosts:</span>
          <span class="has-text-weight-bold">15.846</span>
        </div>
        <div class="agents">
          <span>Agents that are stopped:</span>
          <span class="has-text-weight-bold">22 (from 540,in.)</span>
        </div>
      </template>

      <template v-if="type === 'licenses'">
        <span class="is-size-5 is-pulled-left">
          <b-icon type="is-info" pack="fas" icon="exclamation"></b-icon>
        </span>
        <p style="margin-left: 20px">
          Enterprise Data Quality Real-Time Processing for Data Integration
        </p>
      </template>

      <template v-if="type === 'system'">
        <span class="is-size-5 is-pulled-left">
          <b-icon
            type="is-warning"
            pack="fas"
            icon="exclamation-triangle"
          ></b-icon>
        </span>
        <p style="margin-left: 35px">
          Management Pack for Oracle Data Integrator
        </p>
      </template>
    </div>
    <footer class="card-footer">
      <b-button
        v-for="btn in buttons"
        :key="btn"
        href="#"
        class="is-small is-primary is-radiusless"
        expanded
      >
        {{ btn }}
      </b-button>
    </footer>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: ''
    },
    buttons: {
      type: Array
    }
  }
}
</script>

<style lang="scss" scoped>
.notification {
  padding: 0;

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
}
</style>
