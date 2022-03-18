<template>
  <OracleDBs v-if="isMounted" />
</template>

<script>
import { mapActions } from 'vuex'
import OracleDBs from '@/components/databases/oracle/OracleDBs.vue'

export default {
  components: {
    OracleDBs,
  },
  data() {
    return {
      isMounted: false,
    }
  },
  async beforeMount() {
    await this.getOracleDbs()
    await this.getTopWorkload()
    await this.getTopUnusedIR()
    await this.getOracleStatistics()
  },
  mounted() {
    this.isMounted = true
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
