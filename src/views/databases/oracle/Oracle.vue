<template>
  <OracleDBs />
</template>

<script>
import { mapActions } from 'vuex'
import OracleDBs from '@/components/databases/oracle/OracleDBs.vue'

export default {
  components: {
    OracleDBs,
  },
  async beforeMount() {
    await this.getOracleDbs()
    await this.getTopWorkload()
    await this.getTopUnusedIR()
    await this.getOracleStatistics()
  },
  methods: {
    ...mapActions([
      'getOracleDbs',
      'getTopWorkload',
      'getTopUnusedIR',
      'getOracleStatistics',
    ]),
  },
}
</script>

<style lang="scss" scoped></style>
