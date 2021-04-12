<template>
  <section>
    <ShowHideColumnButton toggleText="Agreement form" />
    <b-tabs size="is-small" type="is-boxed" class="block">
      <b-tab-item label="Oracle">
        <OracleAgreements />
      </b-tab-item>
      <!-- <b-tab-item label="MySQL">
        <MySqlAgreements />
      </b-tab-item> -->
    </b-tabs>
  </section>
</template>

<script>
import OracleAgreements from '@/components/licenses/agreement/Oracle/OracleAgreements.vue'
// import MySqlAgreements from '@/components/licenses/agreement/MySQL/MySqlAgreements.vue'
import ShowHideColumnButton from '@/components/common/ShowHideColumnButton.vue'

export default {
  components: {
    OracleAgreements,
    // MySqlAgreements,
    ShowHideColumnButton
  }
}
</script>

<style lang="scss" scoped></style>
