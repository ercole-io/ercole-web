<template>
  <span class="has-text-weight-medium	is-size-7">
    {{ currentHostNotifications.total }} new alerts from the last week:
    <a
      v-if="currentHostNotifications.agents > 0"
      @click="redirectToAlerts(currentHostNotifications.hostname, 'AGENT')"
    >
      <span class="has-text-weight-light">Agents:</span>
      {{ currentHostNotifications.agents }}
    </a>
    <span v-if="currentHostNotifications.agents === 0">
      <span class="has-text-weight-light">Agents:</span>
      {{ currentHostNotifications.agents }}
    </span>
    |
    <a
      v-if="currentHostNotifications.licenses > 0"
      @click="redirectToAlerts(currentHostNotifications.hostname, 'LICENSE')"
    >
      <span class="has-text-weight-light">Licenses:</span>
      {{ currentHostNotifications.licenses }}
    </a>
    <span v-if="currentHostNotifications.licenses === 0">
      <span class="has-text-weight-light">Licenses:</span>
      {{ currentHostNotifications.licenses }}
    </span>
    |
    <a
      v-if="currentHostNotifications.engine > 0"
      @click="redirectToAlerts(currentHostNotifications.hostname, 'ENGINE')"
    >
      <span class="has-text-weight-light">Engine:</span>
      {{ currentHostNotifications.engine }}
    </a>
    <span v-if="currentHostNotifications.engine === 0">
      <span class="has-text-weight-light">Engine:</span>
      {{ currentHostNotifications.engine }}
    </span>
  </span>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  methods: {
    redirectToAlerts(hostname, category) {
      this.$store.commit('SET_ALERTS_PARAMS', {
        category: category,
        severity: null,
        hostname: hostname
      })
      this.$router.push('/alerts')
    }
  },
  computed: {
    ...mapGetters(['currentHostNotifications'])
  }
}
</script>

<style lang="scss" scoped></style>
