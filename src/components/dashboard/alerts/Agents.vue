<template>
  <div class="card notification">
    <header class="card-header">
      <p class="card-header-title title">
        <b-icon
          type="is-dark"
          pack="fas"
          size="is-small"
          icon="broadcast-tower"
        />
        <span>Agents</span>
      </p>
    </header>
    <div class="card-content body">
      <template>
        <div class="agents">
          <span>Agents that are stopped:</span>
          <span class="has-text-weight-bold">{{ stoppedAgents }}</span>
        </div>
      </template>
    </div>
    <footer class="card-footer">
      <b-button
        @click="inspectAgents"
        type="is-small"
        class="is-radiusless has-background-grey has-text-white-ter	has-text-weight-bold"
        expanded
      >
        Inspect
      </b-button>
    </footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  methods: {
    inspectAgents() {
      this.$router.push(`/alerts/NO_DATA/AGENT`)
    }
  },
  computed: {
    ...mapGetters(['getFilteredAgents']),
    stoppedAgents() {
      return this.getFilteredAgents('NO_DATA', 'AGENT').length
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  font-size: 0.9em !important;

  span:not(:first-child) {
    padding-left: 5px;
  }
}

.body {
  font-size: 0.75rem;
  padding: 1em;
}

.agents {
  display: flex;
  justify-content: space-between;
}

.notification {
  padding: 0;
}
</style>
