<template>
  <section>
    <b-tabs
      size="is-small"
      type="is-boxed"
      class="block"
      v-model="activeTab"
      @input="onTabChange"
    >
      <b-tab-item label="Oracle">
        <OracleContracts />
      </b-tab-item>
      <b-tab-item label="MySQL">
        <MySqlContracts />
      </b-tab-item>
      <b-tab-item label="SQLServer">
        <MsSqlServerContracts />
      </b-tab-item>
    </b-tabs>
  </section>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import OracleContracts from '@/components/licenses/contracts/Oracle/OracleContracts.vue'
import MySqlContracts from '@/components/licenses/contracts/MySQL/MySqlContracts.vue'
import MsSqlServerContracts from '@/components/licenses/contracts/Microsoft/MsSqlServerContracts.vue'
import { mapActions } from 'vuex'

export default {
  name: 'licensescontracts-page',
  components: {
    OracleContracts,
    MySqlContracts,
    MsSqlServerContracts,
  },
  data() {
    return {
      activeTab: 0,
    }
  },
  mounted() {
    this.getLicensesHosts()
    this.getLicensesClusters()
  },
  methods: {
    ...mapActions(['getLicensesHosts', 'getLicensesClusters']),
    onTabChange(value) {
      console.log(value)
      bus.$emit('onTabChange', value)
    },
  },
}
</script>

<style lang="scss" scoped></style>
