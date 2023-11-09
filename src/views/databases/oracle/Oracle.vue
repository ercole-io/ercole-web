<template>
  <div>
    <OracleDBs />
    <SemaphoreModal />
  </div>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { mapActions, mapGetters } from 'vuex'
import OracleDBs from '@/components/databases/oracle/OracleDBs.vue'
import SemaphoreModal from '@/components/hosts/hostDetails/oracle/SemaphoreModal.vue'

export default {
  name: 'oracle-databases-page',
  components: {
    OracleDBs,
    SemaphoreModal,
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
