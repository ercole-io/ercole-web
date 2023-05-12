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
        <ExadataProgress :exadataProgress="data.progress" />
        <IbSwitches
          :ibSwitchesData="data.components['IBSWITCH']"
          v-if="data.components['IBSWITCH']"
        />
        <Storages
          :storagesData="data.components['STORAGE_CELL']"
          v-if="data.components['STORAGE_CELL']"
        />
        <KvmHosts
          :kvmHostsData="data.components['KVM_HOST']"
          v-if="data.components['KVM_HOST']"
        />
        <Vms :vmsData="data.components['VM']" v-if="data.components['VM']" />
        <Dom0s
          :dom0sData="data.components['DOM0'] || data.components['DOMO0']"
          v-if="data.components['DOM0'] || data.components['DOMO0']"
        />
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
import ExadataProgress from '@/components/engineered/exadatas/ExadataProgress.vue'
import KvmHosts from '@/components/engineered/exadatas/KvmHosts.vue'
import IbSwitches from '@/components/engineered/exadatas/IbSwitches.vue'
import Storages from '@/components/engineered/exadatas/Storages.vue'
import Vms from '@/components/engineered/exadatas/Vms.vue'
import Dom0s from '@/components/engineered/exadatas/Dom0s.vue'

export default {
  mixins: [tooltipMixin],
  name: 'engineered-tables-component',
  components: {
    BoxContent,
    GhostLoading,
    NoContent,
    ExportButton,
    SearchInput,
    ExadataProgress,
    KvmHosts,
    IbSwitches,
    Storages,
    Vms,
    Dom0s,
  },
  computed: {
    ...mapGetters(['getEngSys', 'loadingTableStatus']),
  },
}
</script>

<style lang="scss" scoped></style>
