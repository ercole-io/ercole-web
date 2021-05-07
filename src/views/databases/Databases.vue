<template>
  <BaseLayoutColumns
    v-if="isMounted"
    :pageCols="[
      { colsize: '9', slotName: 'content' },
      { colsize: '3', slotName: 'side' }
    ]"
  >
    <DbList slot="content" />
    <div slot="side">
      <DbTotalMemorySize />
      <DbTotalSegmentSize />
      <DbCharts
        id="databasesChart"
        chartHeight="500px"
        :xAxesConfig="[true, 'top']"
      />
    </div>
  </BaseLayoutColumns>
</template>

<script>
import { mapActions } from 'vuex'
import BaseLayoutColumns from '@/components/common/BaseLayoutColumns.vue'
import DbList from '@/components/databases/databases/DbList.vue'
import DbCharts from '@/components/databases/databases/DbCharts.vue'
import DbTotalMemorySize from '@/components/databases/databases/DbTotalMemorySize.vue'
import DbTotalSegmentSize from '@/components/databases/databases/DbTotalSegmentSize.vue'

export default {
  components: {
    BaseLayoutColumns,
    DbList,
    DbCharts,
    DbTotalMemorySize,
    DbTotalSegmentSize
  },
  data() {
    return {
      isMounted: false
    }
  },
  async beforeMount() {
    await this.getDatabases().then(() => (this.isMounted = true))
  },
  methods: {
    ...mapActions(['getDatabases'])
  }
}
</script>

<style lang="scss" scoped></style>
