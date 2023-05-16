<template>
  <article>
    <div
      class="is-flex is-justify-content-flex-end"
      v-if="getEngSys.length > 0"
    >
      <SearchInput v-model="exadataSearchTherm" class="mr-2" />
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
        v-for="data in exadataSearch"
        :key="data._id"
        class="column is-6"
      >
        <ExadataProgress :exadataProgress="data.progress" />

        <ExadataTypes
          typeName="KVM Host"
          :typeData="data.components['KVM_HOST']"
          v-if="data.components['KVM_HOST']"
        />

        <ExadataTypes
          typeName="Bare Metal"
          :typeData="data.components['BARE_METAL']"
          v-if="data.components['BARE_METAL']"
        />

        <ExadataTypes
          typeName="DOM0"
          :typeData="data.components['DOM0']"
          v-if="data.components['DOM0']"
        />

        <ExadataTypes
          typeName="IBSwitch"
          :typeData="data.components['IBSWITCH']"
          v-if="data.components['IBSWITCH']"
        />

        <ExadataTypes
          typeName="Storage"
          :typeData="data.components['STORAGE_CELL']"
          v-if="data.components['STORAGE_CELL']"
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
import _ from 'lodash'
import { mapGetters } from 'vuex'
import tooltipMixin from '@/mixins/tooltipMixin.js'
import BoxContent from '@/components/common/BoxContent.vue'
import GhostLoading from '@/components/common/GhostLoading.vue'
import NoContent from '@/components/common/NoContent.vue'
import ExportButton from '@/components/common/ExportButton.vue'
import SearchInput from '@/components/common/SearchInput.vue'
import ExadataProgress from '@/components/engineered/exadatas/ExadataProgress.vue'
import ExadataTypes from '@/components/engineered/exadatas/ExadataTypes.vue'
// import KvmHosts from '@/components/engineered/exadatas/KvmHosts.vue'
// import IbSwitches from '@/components/engineered/exadatas/IbSwitches.vue'
// import Storages from '@/components/engineered/exadatas/Storages.vue'
// import BareMetals from '@/components/engineered/exadatas/BareMetals.vue'
// import Dom0s from '@/components/engineered/exadatas/Dom0s.vue'

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
    ExadataTypes,
    // KvmHosts,
    // IbSwitches,
    // Storages,
    // BareMetals,
    // Dom0s,
  },
  data() {
    return {
      exadataSearchTherm: '',
    }
  },
  computed: {
    ...mapGetters(['getEngSys', 'loadingTableStatus']),
    exadataSearch() {
      if (this.exadataSearchTherm !== '') {
        return _.filter(this.getEngSys, (val) => {
          // return _.map(val.components, (comp) => {
          //   return _.filter(comp, (c) => {
          //     return _.includes(
          //       c.hostname.toUpperCase(),
          //       this.exadataSearchTherm.toUpperCase()
          //     )
          //   })
          // })

          return _.includes(
            val.hostname.toUpperCase(),
            this.exadataSearchTherm.toUpperCase()
          )
        })
      } else {
        return this.getEngSys
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
