<template>
  <b-tabs
    v-model="activeTab"
    :multiline="multiline"
    size="is-small"
    type="is-primary"
  >
    <template v-for="dbs in hostDbs">
      <b-tab-item :key="dbs.UniqueName" :label="dbs.Name">
        {{ dbs.Name }}
      </b-tab-item>
    </template>
  </b-tabs>
</template>

<script>
export default {
  props: {
    hostDbs: {
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
