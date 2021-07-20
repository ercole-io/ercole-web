<template>
  <div>
    <BoxContent
      :title="data.hostname"
      border
      v-for="data in getEngSys"
      :key="data.hostname"
    >
      <ExportButton
        slot="customTitle"
        url="/hosts/technologies/oracle/exadata"
        expName="engSystems"
      />

      <DbServers :data="data.dbServers" />

      <IBSwitch :data="data.ibSwitches" />

      <Storage :data="data.storageServers" />
    </BoxContent>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BoxContent from '@/components/common/BoxContent.vue'
import DbServers from '@/components/engineered/DbServersTable.vue'
import IBSwitch from '@/components/engineered/IBSwitchTable.vue.vue'
import Storage from '@/components/engineered/StorageTable.vue'
import ExportButton from '@/components/common/ExportButton.vue'

export default {
  components: {
    BoxContent,
    DbServers,
    IBSwitch,
    Storage,
    ExportButton
  },
  computed: {
    ...mapGetters(['getEngSys'])
  }
}
</script>

<style lang="scss" scoped></style>
