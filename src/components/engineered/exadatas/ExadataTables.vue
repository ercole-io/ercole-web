<template>
  <article>
    <div
      class="is-flex is-justify-content-flex-end"
      v-if="getEngSys.length > 0"
    >
      <SearchInput v-model="exadataSearchTherm" class="mr-2" />
      <ExportButton url="exadata" expName="exadata" />
    </div>
    <div class="columns" style="flex-flow: wrap">
      <template v-for="(item, k) in 4">
        <GhostLoading
          :isLoading="loadingTableStatus"
          setHeight="395"
          class="column is-6"
          v-if="loadingTableStatus"
          :key="k"
        />
      </template>

      <BoxContent
        :title="data.hostname"
        border
        v-for="data in exadataSearch"
        :key="data._id"
        class="column is-6 mb-5"
        customStyle="padding: 0 0.5rem"
        hasHighlight
        hasShadow
        :mbottom="false"
      >
        <ExadataProgress :exadataProgress="data.progress" />

        <ExadataTypes
          typeName="KVM Host"
          :typeData="data.kvmhost"
          :openRowAfterSearch="kvmOpenRows"
          v-if="data.kvmhost && data.kvmhost.length > 0"
        />

        <ExadataTypes
          typeName="Bare Metal"
          :typeData="data.baremetal"
          v-if="data.baremetal && data.baremetal.length > 0"
        />

        <ExadataTypes
          typeName="DOM0"
          :typeData="data.dom0"
          :openRowAfterSearch="domOpenRows"
          v-if="data.dom0 && data.dom0.length > 0"
        />

        <ExadataTypes
          typeName="IBSwitch"
          :typeData="data.ibswitch"
          v-if="data.ibswitch && data.ibswitch.length > 0"
        />

        <ExadataTypes
          typeName="Storage"
          :typeData="data.storagecell"
          :openRowAfterSearch="stoOpenRows"
          v-if="data.storagecell && data.storagecell.length > 0"
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
  },
  data() {
    return {
      exadataSearchTherm: '',
      kvmOpenRows: [],
      domOpenRows: [],
      stoOpenRows: [],
    }
  },
  methods: {
    clearSearch() {
      this.kvmOpenRows = []
      this.domOpenRows = []
      this.stoOpenRows = []

      return this.getEngSys
    },
  },
  computed: {
    ...mapGetters(['getEngSys', 'loadingTableStatus']),
    exadataSearch() {
      if (this.exadataSearchTherm !== '') {
        const search = _.filter(this.getEngSys, (obj) => {
          const searchIncludes = (data) => {
            return _.includes(
              _.lowerCase(JSON.stringify(data)),
              _.lowerCase(_.toString(this.exadataSearchTherm))
            )
          }

          _.filter(obj.kvmhost, (kvm) => {
            if (searchIncludes(kvm)) {
              this.kvmOpenRows.push(kvm.hostname)
            }
          })

          _.filter(obj.dom0, (dom) => {
            if (searchIncludes(dom)) {
              this.domOpenRows.push(dom.hostname)
            }
          })

          _.filter(obj.storagecell, (sto) => {
            if (searchIncludes(sto)) {
              this.stoOpenRows.push(sto.hostname)
            }
          })

          return searchIncludes(obj)
        })

        return search
      } else {
        return this.clearSearch()
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
