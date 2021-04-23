<template>
  <section>
    <div class="columns">
      <div class="column is-8">
        <OracleDBs />
      </div>
      <div class="column is-4">
        <div class="columns">
          <div class="column is-3">
            <OracleCpu />
          </div>
          <div class="column is-3">
            <OracleMemory />
          </div>
          <div class="column is-6">
            <OracleStorage />
          </div>
        </div>
        <div class="columns">
          <div class="column is-12">
            <Top3Workload />
          </div>
        </div>
        <div class="columns">
          <div class="column is-12">
            <Top3Reclaimable />
          </div>
        </div>
        <div class="columns">
          <div class="column is-12">
            <OracleCharts />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex'
import Top3Workload from '@/components/databases/oracle/Top3Workload.vue'
import Top3Reclaimable from '@/components/databases/oracle/Top3Reclaimable.vue'
import OracleDBs from '@/components/databases/oracle/OracleDBs.vue'
import OracleCharts from '@/components/databases/oracle/OracleCharts.vue'
import OracleCpu from '@/components/databases/oracle/OracleCpu.vue'
import OracleMemory from '@/components/databases/oracle/OracleMemory.vue'
import OracleStorage from '@/components/databases/oracle/OracleStorage.vue'

export default {
  components: {
    Top3Workload,
    Top3Reclaimable,
    OracleDBs,
    OracleCharts,
    OracleCpu,
    OracleMemory,
    OracleStorage
  },
  async beforeMount() {
    await this.getOracleDbs()
  },
  methods: {
    ...mapActions(['getOracleDbs'])
  }
}
</script>

<style lang="scss" scoped></style>
