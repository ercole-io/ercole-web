<template>
  <span class="has-text-weight-medium	is-size-7">
    {{ getNotificationInfo.total }} new alerts from the last week:
    <a
      v-if="getNotificationInfo.agents > 0"
      @click="redirectToAlerts(getNotificationInfo.hostname, 'AGENT')"
    >
      <span class="has-text-weight-light">Agents:</span>
      {{ getNotificationInfo.agents }}
    </a>
    <span v-if="getNotificationInfo.agents === 0">
      <span class="has-text-weight-light">Agents:</span>
      {{ getNotificationInfo.agents }}
    </span>
    |
    <a
      v-if="getNotificationInfo.licenses > 0"
      @click="redirectToAlerts(getNotificationInfo.hostname, 'LICENSE')"
    >
      <span class="has-text-weight-light">Licenses:</span>
      {{ getNotificationInfo.licenses }}
    </a>
    <span v-if="getNotificationInfo.licenses === 0">
      <span class="has-text-weight-light">Licenses:</span>
      {{ getNotificationInfo.licenses }}
    </span>
    |
    <a
      v-if="getNotificationInfo.engine > 0"
      @click="redirectToAlerts(getNotificationInfo.hostname, 'ENGINE')"
    >
      <span class="has-text-weight-light">Engine:</span>
      {{ getNotificationInfo.engine }}
    </a>
    <span v-if="getNotificationInfo.engine === 0">
      <span class="has-text-weight-light">Engine:</span>
      {{ getNotificationInfo.engine }}
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
    ...mapGetters(['getNotificationInfo'])
  }
}
</script>

<style lang="scss" scoped></style>
