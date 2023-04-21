<template>
  <GhostLoading :isLoading="loadingTableStatus" setHeight="30" setWidth="360">
    <span class="has-text-weight-medium is-size-7">
      {{ notifications.total }}
      {{ $t('views.hostDetails.notifications') }}
      <a
        v-if="notifications.agents > 0"
        @click="redirectToAlerts(notifications.hostname, 'AGENT')"
        class="is-active"
      >
        <span class="has-text-weight-light">
          {{ $t('views.hostDetails.agents') }}:
        </span>
        {{ notifications.agents }}
      </a>
      <span v-if="notifications.agents === 0">
        <span class="has-text-weight-light">
          {{ $t('views.hostDetails.agents') }}:
        </span>
        {{ notifications.agents }}
      </span>
      |
      <a
        v-if="notifications.licenses > 0"
        @click="redirectToAlerts(notifications.hostname, 'LICENSE')"
        class="is-active"
      >
        <span class="has-text-weight-light">
          {{ $t('views.hostDetails.licenses') }}:
        </span>
        {{ notifications.licenses }}
      </a>
      <span v-if="notifications.licenses === 0">
        <span class="has-text-weight-light">
          {{ $t('views.hostDetails.licenses') }}:
        </span>
        {{ notifications.licenses }}
      </span>
      |
      <a
        v-if="notifications.engine > 0"
        @click="redirectToAlerts(notifications.hostname, 'ENGINE')"
        class="is-active"
      >
        <span class="has-text-weight-light">
          {{ $t('views.hostDetails.engine') }}:
        </span>
        {{ notifications.engine }}
      </a>
      <span v-if="notifications.engine === 0">
        <span class="has-text-weight-light">
          {{ $t('views.hostDetails.engine') }}:
        </span>
        {{ notifications.engine }}
      </span>
    </span>
  </GhostLoading>
</template>

<script>
import { mapGetters } from 'vuex'
import GhostLoading from '@/components/common/GhostLoading.vue'

export default {
  name: 'hosts-details-notifications-component',
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
    ...mapGetters(['hostNotifications', 'loadingTableStatus']),
    notifications() {
      return this.hostNotifications
    },
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
