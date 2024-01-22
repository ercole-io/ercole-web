<template>
  <div>
    <OracleDBs />
  </div>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { mapActions, mapGetters } from 'vuex'
import OracleDBs from '@/components/databases/oracle/OracleDBs.vue'

export default {
  name: 'oracle-databases-page',
  components: {
    OracleDBs,
  },
  async beforeMount() {
    await this.getOracleDbs().then(() => {
      bus.$emit('data', this.getAllOracleDBs)
    })
  },
  methods: {
    ...mapActions(['getOracleDbs']),
  },
  computed: {
    ...mapGetters(['getAllOracleDBs']),
  },
}
</script>

<style lang="scss" scoped></style>
