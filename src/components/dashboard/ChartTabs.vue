<template>
  <BoxContent>
    <b-tabs type="is-toggle" size="is-small" expanded>
      <b-tab-item label="All Infrastructures">
        <p>All Infrastructures content</p>
      </b-tab-item>

      <b-tab-item label="Software Types">
        <p>Software Types content</p>
      </b-tab-item>

      <b-tab-item label="Changes">
        <p>Changes content</p>
      </b-tab-item>

      <b-tab-item label="Type of Technologies">
        <p>Type of Technologies content</p>
      </b-tab-item>
    </b-tabs>
  </BoxContent>
</template>

<script>
import BoxContent from '@/components/common/BoxContent.vue'

export default {
  components: {
    BoxContent
  }
}
</script>

<style lang="scss" scoped></style>
