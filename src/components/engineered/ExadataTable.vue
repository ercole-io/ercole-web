<template>
  <SimpleTable :theadData="keys">
    <template slot="tbodyContent" v-if="data.dbServers">
      <th colspan="6" class="subHeader">DB Servers</th>
      <tr v-for="dbServer in data.dbServers" :key="dbServer.hostname">
        <TdContent :value="dbServer.hostname" />
        <TdContent :value="dbServer.model" />
        <TdContent :value="dbServer.totalCPUCount" />
        <TdContent :value="dbServer.memory" />
        <TdContent :value="dbServer.swVersion" />
        <TdContent
          :value="`${dbServer.totalPowerSupply || '-'}     ${
            dbServer.tempActual || '-'
          }`"
        />
      </tr>
    </template>
    <template slot="tbodyContent" v-if="data.ibSwitches">
      <th colspan="6" class="subHeader">IBSwitch</th>
      <tr v-for="ibSwitche in data.ibSwitches" :key="ibSwitche.hostname">
        <TdContent :value="ibSwitche.hostname" />
        <TdContent :value="ibSwitche.model" />
        <TdContent :value="ibSwitche.totalCPUCount" />
        <TdContent :value="ibSwitche.memory" />
        <TdContent :value="ibSwitche.swVersion" />
        <TdContent
          :value="`${ibSwitche.totalPowerSupply || '-'}     ${
            ibSwitche.tempActual || '-'
          }`"
        />
      </tr>
    </template>
    <template slot="tbodyContent" v-if="data.storageServers">
      <th colspan="6" class="subHeader">Storage</th>
      <tr
        v-for="storageServer in data.storageServers"
        :key="storageServer.hostname"
      >
        <TdContent :value="storageServer.hostname" />
        <TdContent :value="storageServer.model" />
        <TdContent :value="storageServer.totalCPUCount" />
        <TdContent :value="storageServer.memory" />
        <TdContent :value="storageServer.swVersion" />
        <TdContent
          :value="`${storageServer.totalPowerSupply || '-'}     ${
            storageServer.tempActual || '-'
          }`"
        />
      </tr>
    </template>
  </SimpleTable>
</template>

<script>
import { mapGetters } from 'vuex'
import SimpleTable from '@/components/common/Table/SimpleTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'

export default {
  props: {
    data: {
      type: Object,
      default: () => [],
    },
  },
  components: {
    SimpleTable,
    TdContent,
  },
  data() {
    return {
      keys: [
        this.$i18n.t('common.collumns.hostname'),
        this.$i18n.t('common.collumns.model'),
        this.$i18n.t('common.collumns.cpu'),
        this.$i18n.t('common.collumns.memory'),
        this.$i18n.t('common.collumns.version'),
        this.$i18n.t('common.collumns.powerTemp'),
      ],
    }
  },
  computed: {
    ...mapGetters(['loadingTableStatus']),
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.subHeader {
  border: none;
  background-color: $light-primary;
  padding: 0.2em 0.75em;
  font-size: 12px;
}
</style>
