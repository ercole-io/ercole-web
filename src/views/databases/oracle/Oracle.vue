<template>
  <OracleDBs />
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { mapActions, mapGetters } from 'vuex'
import OracleDBs from '@/components/databases/oracle/OracleDBs.vue'

export default {
  components: {
    OracleDBs,
  },
  async beforeMount() {
    await this.getOracleDbs().then(() => {
      bus.$emit('data', this.getAllOracleDBs)
    })
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
  computed: {
    ...mapGetters(['getAllOracleDBs']),
  },
}
</script>

<style lang="scss" scoped></style>
