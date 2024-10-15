<template>
  <section>
    <b-tabs
      size="is-small"
      class="block"
      v-model="activeTab"
      @input="onTabChange"
    >
      <b-tab-item label="Databases">
        <UsedLicensesDbs :partNumber="partNumber" />
      </b-tab-item>

      <b-tab-item label="Hosts" :disabled="licensesUsed.hostsLoading">
        <UsedLicensesHost :partNumber="partNumber" />
      </b-tab-item>

      <b-tab-item
        label="Hypervisor Clusters"
        :disabled="licensesUsed.clustersLoading"
      >
        <UsedLicensesClusters :partNumber="partNumber" />
      </b-tab-item>

      <b-tab-item
        label="Veritas Clusters"
        :disabled="licensesUsed.veritasLoading"
      >
        <UsedLicensesVeritas :partNumber="partNumber" />
      </b-tab-item>
    </b-tabs>
  </section>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { mapActions, mapState } from 'vuex'
import UsedLicensesDbs from '@/components/licenses/used/databases/UsedLicensesDbs.vue'
import UsedLicensesHost from '@/components/licenses/used/hosts/UsedLicensesHost.vue'
import UsedLicensesClusters from '@/components/licenses/used/clusters/UsedLicensesClusters.vue'
import UsedLicensesVeritas from '@/components/licenses/used/veritas/UsedLicensesVeritas.vue'

export default {
  name: 'licensesused-page',
  components: {
    UsedLicensesDbs,
    UsedLicensesHost,
    UsedLicensesClusters,
    UsedLicensesVeritas,
  },
  props: {
    partNumber: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      activeTab: 0,
    }
  },
  async beforeMount() {
    await this.getLicensesDatabases()
    await this.getLicensesHosts()
    await this.getLicensesClusters()
    await this.getLicensesVeritas()

    this.onTabChange(this.activeTab)
  },
  methods: {
    ...mapActions([
      'getLicensesDatabases',
      'getLicensesClusters',
      'getLicensesHosts',
      'getLicensesVeritas',
    ]),
    onTabChange(value) {
      bus.$emit('onUsedTabChange', value)
    },
  },
  computed: {
    ...mapState(['licensesUsed']),
  },
}
</script>

<style lang="scss" scoped></style>
