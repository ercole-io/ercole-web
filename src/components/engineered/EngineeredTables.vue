<template>
  <div>
    <GhostLoading
      :isLoading="loadingTableStatus"
      setHeight="36"
      class="mb-4"
      v-if="loadingTableStatus"
    />
    <GhostLoading
      :isLoading="loadingTableStatus"
      setHeight="330"
      v-if="loadingTableStatus"
    />
    <BoxContent
      :title="data.hostname"
      border
      v-for="(data, i) in getEngSys"
      :key="data.hostname"
    >
      <ExportButton
        slot="customTitle"
        url="hosts/technologies/oracle/exadata"
        expName="engSystems"
        v-if="i === 0"
      />

      <DbServers :data="data.dbServers" />
      <IBSwitch :data="data.ibSwitches" />
      <Storage :data="data.storageServers" />
    </BoxContent>

    <NoContent
      style="height: 370px; background-color: #eeeeee"
      v-if="getEngSys.length === 0 && !loadingTableStatus"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BoxContent from '@/components/common/BoxContent.vue'
import DbServers from '@/components/engineered/DbServersTable.vue'
import IBSwitch from '@/components/engineered/IBSwitchTable.vue.vue'
import Storage from '@/components/engineered/StorageTable.vue'
import ExportButton from '@/components/common/ExportButton.vue'
import GhostLoading from '@/components/common/GhostLoading.vue'
import NoContent from '@/components/common/NoContent.vue'

export default {
  components: {
    BoxContent,
    DbServers,
    IBSwitch,
    Storage,
    ExportButton,
    GhostLoading,
    NoContent,
  },
  computed: {
    ...mapGetters(['getEngSys', 'loadingTableStatus']),
  },
}
</script>

<style lang="scss" scoped></style>
