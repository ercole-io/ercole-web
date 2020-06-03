<template>
  <b-tabs
    v-model="activeTab"
    :multiline="multiline"
    size="is-small"
    type="is-primary"
  >
    <template v-for="tab in hostData">
      <b-tab-item :key="tab.UniqueName" :label="tab.Name">
        {{ tab.Name }}
      </b-tab-item>
    </template>
  </b-tabs>
</template>

<script>
export default {
  props: {
    hostData: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      activeTab: 0,
      multiline: true
    }
  }
}
</script>

<style lang="scss" scoped></style>
