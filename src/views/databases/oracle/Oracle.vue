<template>
  <OracleDBs v-if="isMounted" />
</template>

<script>
import { mapActions } from 'vuex'
import OracleDBs from '@/components/databases/oracle/OracleDBs.vue'

export default {
  components: {
    OracleDBs
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
