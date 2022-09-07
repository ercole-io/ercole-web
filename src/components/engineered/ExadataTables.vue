<template>
  <article>
    <div
      class="is-flex is-justify-content-flex-end"
      v-if="getEngSys.length > 0"
    >
      <SearchInput class="mr-2" />
      <ExportButton
        url="hosts/technologies/oracle/exadata"
        expName="engSystems"
      />
    </div>
    <div class="columns" style="flex-flow: wrap">
      <GhostLoading
        :isLoading="loadingTableStatus"
        setHeight="395"
        class="column is-6"
        v-if="loadingTableStatus"
      />
      <GhostLoading
        :isLoading="loadingTableStatus"
        setHeight="395"
        v-if="loadingTableStatus"
        class="column is-6"
      />
      <BoxContent
        :title="data.hostname"
        border
        v-for="data in getEngSys"
        :key="data._id"
        class="column is-6"
      >
        <ExadataProgress :exadataProgress="data" />
        <DbServers :dbServersData="data.dbServers" />
        <IbSwitches :ibSwitchesData="data.ibSwitches" />
        <StorageServers :storageServersData="data.storageServers" />
      </BoxContent>

      <NoContent
        class="column is-12"
        style="height: 370px; background-color: #eeeeee"
        v-if="getEngSys.length === 0 && !loadingTableStatus"
      />
    </div>
  </article>
</template>

<script>
import { mapGetters } from 'vuex'
import tooltipMixin from '@/mixins/tooltipMixin.js'
import BoxContent from '@/components/common/BoxContent.vue'
import GhostLoading from '@/components/common/GhostLoading.vue'
import NoContent from '@/components/common/NoContent.vue'
import ExportButton from '@/components/common/ExportButton.vue'
import SearchInput from '@/components/common/SearchInput.vue'
import ExadataProgress from '@/components/engineered/ExadataProgress.vue'
import DbServers from '@/components/engineered/DbServers.vue'
import IbSwitches from '@/components/engineered/IbSwitches.vue'
import StorageServers from '@/components/engineered/StorageServers.vue'

export default {
  mixins: [tooltipMixin],
  components: {
    BoxContent,
    GhostLoading,
    NoContent,
    ExportButton,
    SearchInput,
    ExadataProgress,
    DbServers,
    IbSwitches,
    StorageServers,
  },
  computed: {
    ...mapGetters(['getEngSys', 'loadingTableStatus']),
  },
}
</script>

<style lang="scss" scoped></style>
