<template>
  <section>
    <b-tabs size="is-small" type="is-boxed" class="block" @input="onTabChange">
      <b-tab-item label="Oracle">
        <OracleAgreements />
      </b-tab-item>
      <b-tab-item label="MySQL">
        <MySqlAgreements />
      </b-tab-item>
    </b-tabs>
  </section>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import OracleAgreements from '@/components/licenses/agreement/Oracle/OracleAgreements.vue'
import MySqlAgreements from '@/components/licenses/agreement/MySQL/MySqlAgreements.vue'

export default {
  components: {
    OracleAgreements,
    MySqlAgreements
  },
  methods: {
    onTabChange() {
      bus.$emit('onTabChange')
    }
  }
}
</script>

<style lang="scss" scoped></style>
