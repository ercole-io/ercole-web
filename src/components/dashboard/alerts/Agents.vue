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
        <span>{{ $t('views.dashboard.agents') }}</span>
      </p>
    </header>
    <div class="card-content body">
      <template v-if="!loading">
        <div class="agents">
          <span>{{ $t('views.dashboard.agentsText') }} </span>
          <span class="has-text-weight-bold" data-stoped-agents>
            {{ stoppedAgents }}
          </span>
        </div>
      </template>
      <b-skeleton size="is-small" :active="loading"></b-skeleton>
    </div>
    <footer class="card-footer">
      <template v-if="!loading">
        <b-button
          @click="inspectAgents"
          type="is-small"
          class="is-radiusless has-background-primary has-text-white-bis has-text-weight-bold"
          expanded
          data-inspect
        >
          {{ $t('views.dashboard.inspect') }}
        </b-button>
      </template>

      <b-skeleton height="30" :active="loading"></b-skeleton>
    </footer>
  </div>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { mapGetters, mapMutations } from 'vuex'

export default {
  data() {
    return {
      loading: true
    }
  },
  beforeMount() {
    bus.$on('loadAlertsComplete', () => {
      this.loading = false
    })
  },
  methods: {
    ...mapMutations(['SET_ALERTS_PARAMS']),
    inspectAgents() {
      this.SET_ALERTS_PARAMS({
        category: 'AGENT',
        severity: null,
        hostname: null
      })
      this.$router.push('/alerts')
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
  border-radius: 0;
}
</style>
