<template>
  <article>
    <div
      class="is-flex is-justify-content-flex-end"
      v-if="getExadata.length > 0"
    >
      <SearchInput v-model="exadataSearchTherm" class="mr-2" />
      <!-- <ExportButton url="exadata" expName="exadata" /> -->
    </div>
    <div class="columns mt-2" style="flex-flow: wrap">
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
        :title="`${data['hostname']} - ${data['_id']}`"
        border
        v-for="(data, k) in getExadata(exadataSearchTherm)"
        :key="k"
        class="column is-6 mb-5"
        customStyle="padding: 0 0.5rem"
        hasHighlight
        hasShadow
        :mbottom="false"
      >
        <span slot="customTitle" v-html="highlight(data['machineType'])" />

        <ExadataProgress :exadataProgress="data['progress']" />

        <ExadataTypes
          typeName="KVM"
          :typeData="data['kvmhost']"
          :openRowAfterSearch="kvmOpenRows"
          v-if="data['kvmhost'] && data['kvmhost'].length > 0"
        />

        <ExadataTypes
          typeName="DOM0"
          :typeData="data['dom0']"
          :openRowAfterSearch="domOpenRows"
          v-if="data['dom0'] && data['dom0'].length > 0"
        />

        <ExadataTypes
          typeName="IBSWITCH"
          :typeData="data['ibswitch']"
          v-if="data['ibswitch'] && data['ibswitch'].length > 0"
        />

        <ExadataTypes
          typeName="STORAGE"
          :typeData="data['storagecell']"
          :openRowAfterSearch="stoOpenRows"
          v-if="data['storagecell'] && data['storagecell'].length > 0"
        />
      </BoxContent>

      <NoContent
        class="column is-12"
        style="height: 370px; background-color: #eeeeee"
        v-if="
          getExadata(exadataSearchTherm).length === 0 && !loadingTableStatus
        "
      />
    </div>
  </article>
</template>

<script>
import { mapGetters } from 'vuex'
import tooltipMixin from '@/mixins/tooltipMixin.js'
import HighlightSearchMixin from '@/mixins/highlightSearch.js'
import BoxContent from '@/components/common/BoxContent.vue'
import GhostLoading from '@/components/common/GhostLoading.vue'
import NoContent from '@/components/common/NoContent.vue'
// import ExportButton from '@/components/common/ExportButton.vue'
import SearchInput from '@/components/common/SearchInput.vue'
import ExadataProgress from '@/components/exadata/exadatas/ExadataProgress.vue'
import ExadataTypes from '@/components/exadata/exadatas/ExadataTypes.vue'

export default {
  mixins: [tooltipMixin, HighlightSearchMixin],
  name: 'exadata-tables-component',
  components: {
    BoxContent,
    GhostLoading,
    NoContent,
    // ExportButton,
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
  computed: {
    ...mapGetters(['getExadata', 'loadingTableStatus']),
  },
}
</script>

<style lang="scss" scoped></style>
