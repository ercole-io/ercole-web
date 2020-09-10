<template>
  <span class="has-text-weight-medium	is-size-7">
    {{ getNotificationInfo.total }} notifications from the last week:
    <router-link
      v-if="getNotificationInfo.agents > 0"
      :to="{
        name: 'alerts',
        params: { type: getNotificationInfo.hostname, flag: 'AGENT' }
      }"
      tag="a"
    >
      <span class="has-text-weight-light">Agents:</span>
      {{ getNotificationInfo.agents }}
    </router-link>
    <span v-if="getNotificationInfo.agents === 0">
      <span class="has-text-weight-light">Agents:</span>
      {{ getNotificationInfo.agents }}
    </span>
    |
    <router-link
      v-if="getNotificationInfo.licenses > 0"
      :to="{
        name: 'alerts',
        params: { type: getNotificationInfo.hostname, flag: 'LICENSE' }
      }"
      tag="a"
    >
      <span class="has-text-weight-light">Licenses:</span>
      {{ getNotificationInfo.licenses }}
    </router-link>
    <span v-if="getNotificationInfo.licenses === 0">
      <span class="has-text-weight-light">Licenses:</span>
      {{ getNotificationInfo.licenses }}
    </span>
    |
    <router-link
      v-if="getNotificationInfo.engine > 0"
      :to="{
        name: 'alerts',
        params: { type: getNotificationInfo.hostname, flag: 'ENGINE' }
      }"
      tag="a"
    >
      <span class="has-text-weight-light">Engine:</span>
      {{ getNotificationInfo.engine }}
    </router-link>
    <span v-if="getNotificationInfo.engine === 0">
      <span class="has-text-weight-light">Engine:</span>
      {{ getNotificationInfo.engine }}
    </span>
  </span>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['getNotificationInfo'])
  }
}
</script>

<style lang="scss" scoped></style>
