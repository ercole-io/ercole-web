<template>
  <section>
    <b-tabs
      size="is-small"
      type="is-boxed"
      class="block"
      v-model="activeTab"
      @input="onTabChange"
    >
      <b-tab-item label="Databases">
        <UsedLicensesDbs :partNumber="partNumber" />
      </b-tab-item>
      <b-tab-item label="Hosts">
        <UsedLicensesHost :partNumber="partNumber" />
      </b-tab-item>
      <b-tab-item label="Clusters">
        <UsedLicensesClusters :partNumber="partNumber" />
      </b-tab-item>
    </b-tabs>
  </section>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { mapActions } from 'vuex'
import UsedLicensesDbs from '@/components/licenses/used/databases/UsedLicensesDbs.vue'
import UsedLicensesHost from '@/components/licenses/used/hosts/UsedLicensesHost.vue'
import UsedLicensesClusters from '@/components/licenses/used/clusters/UsedLicensesClusters.vue'

export default {
  components: {
    UsedLicensesDbs,
    UsedLicensesHost,
    UsedLicensesClusters,
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

    this.onTabChange(this.activeTab)
  },
  methods: {
    ...mapActions([
      'getLicensesDatabases',
      'getLicensesClusters',
      'getLicensesHosts',
    ]),
    onTabChange(value) {
      bus.$emit('onUsedTabChange', value)
    },
  },
}
</script>

<style lang="scss" scoped></style>
