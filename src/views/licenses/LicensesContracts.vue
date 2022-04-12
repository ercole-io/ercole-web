<template>
  <section>
    <b-tabs size="is-small" type="is-boxed" class="block" @input="onTabChange">
      <b-tab-item label="Oracle">
        <OracleContracts />
      </b-tab-item>
      <b-tab-item label="MySQL">
        <MySqlContracts />
      </b-tab-item>
    </b-tabs>
  </section>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import OracleContracts from '@/components/licenses/contracts/Oracle/OracleContracts.vue'
import MySqlContracts from '@/components/licenses/contracts/MySQL/MySqlContracts.vue'

export default {
  components: {
    OracleContracts,
    MySqlContracts,
  },
  methods: {
    onTabChange() {
      bus.$emit('onTabChange')
    },
  },
}
</script>

<style lang="scss" scoped></style>
