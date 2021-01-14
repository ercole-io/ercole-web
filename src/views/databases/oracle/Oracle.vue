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

<style lang="scss" scoped>
// .top3 {
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   max-width: 33.3%;

//   span:not(.number-marker) {
//     font-size: 0.65em;
//   }

//   p {
//     margin-bottom: 0.5em;
//     font-size: 0.9em;
//     font-weight: 500;
//     white-space: nowrap;
//     text-overflow: ellipsis;
//     overflow: hidden;
//     max-width: 100%;
//   }
// }

// .number-marker {
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   border-radius: 50%;
//   width: 30px;
//   height: 30px;
//   background-color: #4a4a4a;
//   color: #ffffff;
//   font-weight: bold;
//   font-size: 18px;
//   padding-top: 1px;
//   margin-bottom: 5px;
// }
</style>
