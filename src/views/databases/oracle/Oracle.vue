<template>
  <section>
    <div class="columns">
      <div class="column is-6">
        <Top3Workload />
      </div>
      <div class="column is-6">
        <Top3Reclaimable />
      </div>
    </div>

    <div class="columns">
      <div class="column is-12">
        <OracleDBs />
      </div>
    </div>

    <div class="columns">
      <div class="column is-6">
        <OracleCharts id="TypeOfEnvironment" />
      </div>
      <div class="column is-6">
        <OracleCharts id="ArchivelogMode" />
      </div>
    </div>

    <div class="columns">
      <div class="column is-6">
        <OracleCharts id="DisasterRecovery" />
      </div>
      <div class="column is-6">
        <OracleCharts id="HighAvailability" />
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

export default {
  components: {
    Top3Workload,
    Top3Reclaimable,
    OracleDBs,
    OracleCharts
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
