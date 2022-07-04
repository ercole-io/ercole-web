<template>
  <div class="card notification" data-cy="agents">
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
      <div class="agents">
        <span data-cy="agents-desc"
          >{{ $t('views.dashboard.agentsText') }}
        </span>

        <span class="has-text-weight-bold" data-stoped-agents>
          <GhostLoading :isLoading="loading" setWidth="20">
            {{ stoppedAgents }}
          </GhostLoading>
        </span>
      </div>
    </div>
    <GhostLoading :isLoading="loading" setHeight="30">
      <footer class="card-footer">
        <b-button
          @click="inspectAgents"
          type="is-ercole-blue"
          size="is-small"
          class="is-radiusless has-text-weight-bold"
          expanded
          data-inspect
        >
          {{ $t('views.dashboard.inspect') }}
        </b-button>
      </footer>
    </GhostLoading>
  </div>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { mapGetters, mapMutations } from 'vuex'
import GhostLoading from '@/components/common/GhostLoading.vue'

export default {
  components: {
    GhostLoading,
  },
  data() {
    return {
      loading: true,
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
        hostname: null,
      })
      this.$router.push('/alerts')
    },
  },
  computed: {
    ...mapGetters(['getFilteredAgents']),
    stoppedAgents() {
      return this.getFilteredAgents('NO_DATA', 'AGENT').length
    },
  },
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
