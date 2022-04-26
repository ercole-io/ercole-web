<template>
  <GhostLoading :isLoading="loadingTableStatus" setHeight="30" setWidth="360">
    <span class="has-text-weight-medium is-size-7">
      {{ currentHostNotifications.total }}
      {{ $t('views.hostDetails.notifications') }}
      <a
        v-if="currentHostNotifications.agents > 0"
        @click="redirectToAlerts(currentHostNotifications.hostname, 'AGENT')"
        class="is-active"
      >
        <span class="has-text-weight-light">
          {{ $t('views.hostDetails.agents') }}:
        </span>
        {{ currentHostNotifications.agents }}
      </a>
      <span v-if="currentHostNotifications.agents === 0">
        <span class="has-text-weight-light">
          {{ $t('views.hostDetails.agents') }}:
        </span>
        {{ currentHostNotifications.agents }}
      </span>
      |
      <a
        v-if="currentHostNotifications.licenses > 0"
        @click="redirectToAlerts(currentHostNotifications.hostname, 'LICENSE')"
        class="is-active"
      >
        <span class="has-text-weight-light">
          {{ $t('views.hostDetails.licenses') }}:
        </span>
        {{ currentHostNotifications.licenses }}
      </a>
      <span v-if="currentHostNotifications.licenses === 0">
        <span class="has-text-weight-light">
          {{ $t('views.hostDetails.licenses') }}:
        </span>
        {{ currentHostNotifications.licenses }}
      </span>
      |
      <a
        v-if="currentHostNotifications.engine > 0"
        @click="redirectToAlerts(currentHostNotifications.hostname, 'ENGINE')"
        class="is-active"
      >
        <span class="has-text-weight-light">
          {{ $t('views.hostDetails.engine') }}:
        </span>
        {{ currentHostNotifications.engine }}
      </a>
      <span v-if="currentHostNotifications.engine === 0">
        <span class="has-text-weight-light">
          {{ $t('views.hostDetails.engine') }}:
        </span>
        {{ currentHostNotifications.engine }}
      </span>
    </span>
  </GhostLoading>
</template>

<script>
import { mapGetters } from 'vuex'
import GhostLoading from '@/components/common/GhostLoading.vue'

export default {
  components: {
    GhostLoading,
  },
  methods: {
    redirectToAlerts(hostname, category) {
      this.$store.commit('SET_ALERTS_PARAMS', {
        category: category,
        severity: null,
        hostname: hostname,
      })
      this.$router.push('/alerts')
    },
  },
  computed: {
    ...mapGetters(['currentHostNotifications', 'loadingTableStatus']),
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';
.is-active {
  color: $custom-primary;

  &:hover {
    color: $ercole-blue;
  }
}
</style>
