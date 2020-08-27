<template>
  <span class="has-text-weight-medium	is-size-7">
    {{ info.total }} notifications from the last week:
    <router-link
      v-if="info.agents > 0"
      :to="{ name: 'alerts', params: { type: info.hostname, flag: 'AGENT' } }"
      tag="a"
    >
      <span class="has-text-weight-light">Agents:</span> {{ info.agents }}
    </router-link>
    <span v-if="info.agents === 0">
      <span class="has-text-weight-light">Agents:</span>
      {{ info.agents }}
    </span>
    |
    <router-link
      v-if="info.licenses > 0"
      :to="{ name: 'alerts', params: { type: info.hostname, flag: 'LICENSE' } }"
      tag="a"
    >
      <span class="has-text-weight-light">Licenses:</span>
      {{ info.licenses }}
    </router-link>
    <span v-if="info.licenses === 0">
      <span class="has-text-weight-light">Licenses:</span>
      {{ info.licenses }}
    </span>
    |
    <router-link
      v-if="info.engine > 0"
      :to="{ name: 'alerts', params: { type: info.hostname, flag: 'ENGINE' } }"
      tag="a"
    >
      <span class="has-text-weight-light">Engine:</span> {{ info.engine }}
    </router-link>
    <span v-if="info.engine === 0">
      <span class="has-text-weight-light">Engine:</span>
      {{ info.engine }}
    </span>
  </span>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped></style>
