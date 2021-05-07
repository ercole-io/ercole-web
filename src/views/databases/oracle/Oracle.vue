<template>
  <BaseLayoutColumns
    v-if="isMounted"
    :pageCols="[
      { colsize: '9', slotName: 'content' },
      { colsize: '3', slotName: 'side' }
    ]"
  >
    <OracleDBs slot="content" />
    <div slot="side">
      <BaseLayoutColumns
        :pageCols="[
          { colsize: '6', slotName: 'cpu' },
          { colsize: '6', slotName: 'memory' }
        ]"
      >
        <OracleCpu slot="cpu" />
        <OracleMemory slot="memory" />
      </BaseLayoutColumns>

      <BaseLayoutColumns :pageCols="[{ colSize: '12', slotName: 'storage' }]">
        <OracleStorage slot="storage" />
      </BaseLayoutColumns>

      <Top3Workload slot="workload" />
      <Top3Reclaimable slot="reclaimable" />
      <OracleCharts slot="charts" />
    </div>
  </BaseLayoutColumns>
</template>

<script>
import { mapActions } from 'vuex'
import BaseLayoutColumns from '@/components/common/BaseLayoutColumns.vue'
import Top3Workload from '@/components/databases/oracle/Top3Workload.vue'
import Top3Reclaimable from '@/components/databases/oracle/Top3Reclaimable.vue'
import OracleDBs from '@/components/databases/oracle/OracleDBs.vue'
import OracleCharts from '@/components/databases/oracle/OracleCharts.vue'
import OracleCpu from '@/components/databases/oracle/OracleCpu.vue'
import OracleMemory from '@/components/databases/oracle/OracleMemory.vue'
import OracleStorage from '@/components/databases/oracle/OracleStorage.vue'

export default {
  components: {
    BaseLayoutColumns,
    Top3Workload,
    Top3Reclaimable,
    OracleDBs,
    OracleCharts,
    OracleCpu,
    OracleMemory,
    OracleStorage
  },
  data() {
    return {
      isMounted: false
    }
  },
  async beforeMount() {
    await this.getOracleDbs().then(() => (this.isMounted = true))
  },
  methods: {
    ...mapActions(['getOracleDbs'])
  }
}
</script>

<style lang="scss" scoped></style>
