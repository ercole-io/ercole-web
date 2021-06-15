<template>
  <section v-if="isMounted">
    <b-tabs size="is-small" type="is-boxed" class="block" @input="onTabChange">
      <b-tab-item label="Databases">
        <UsedLicensesDbs />
      </b-tab-item>
      <b-tab-item label="Hosts">
        <UsedLicensesHost />
      </b-tab-item>
    </b-tabs>
  </section>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { mapActions } from 'vuex'
import UsedLicensesDbs from '@/components/licenses/used/databases/UsedLicensesDbs.vue'
import UsedLicensesHost from '@/components/licenses/used/hosts/UsedLicensesHost.vue'

export default {
  components: {
    UsedLicensesDbs,
    UsedLicensesHost
  },
  data() {
    return {
      isMounted: false
    }
  },
  async beforeMount() {
    await this.getAgreementParts()
    await this.getLicensesList().then(() => (this.isMounted = true))
  },
  methods: {
    ...mapActions(['getLicensesList', 'getAgreementParts']),
    onTabChange() {
      bus.$emit('onUsedTabChange')
    }
  }
}
</script>

<style lang="scss" scoped></style>
