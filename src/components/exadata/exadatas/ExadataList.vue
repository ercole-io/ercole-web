<template>
  <article>
    <div class="is-flex is-justify-content-flex-end" v-if="!loadingTableStatus">
      <SearchInput v-model="exadataSearchTherm" class="mr-2" isLazy />
      <!-- <ExportButton url="exadata" expName="exadata" /> -->
    </div>

    <template v-if="loadingTableStatus">
      <div class="columns mt-2">
        <GhostLoading
          :isLoading="loadingTableStatus"
          setHeight="600"
          class="column is-2"
        />
        <GhostLoading
          :isLoading="loadingTableStatus"
          setHeight="600"
          class="column"
        />
      </div>
    </template>

    <template v-else>
      <b-tabs
        size="is-small"
        type="is-toggle"
        destroy-on-hide
        vertical
        animated
        expanded
        class="vertical-tabs-scroll mt-4"
      >
        <b-tab-item
          v-for="exadata in getExadataList"
          :value="exadata"
          :label="exadata"
          :key="exadata"
          style="margin-top: -25px"
        >
          <BoxContent
            :title="`${data['exadata']} - ${data['_id']}`"
            border
            v-for="data in getExadataListData(exadata)"
            :key="`${data['_id']}`"
            class="column mb-5"
            customStyle="padding: 0 0.5rem"
            hasHighlight
            hasShadow
            :mbottom="false"
          >
            <span slot="customTitle" v-html="highlight(data['machineType'])" />

            <ExadataProgress
              :exadataProgress="data['progress']"
              :exadataType="data['machineType']"
            />

            <ExadataTypes
              typeName="KVM"
              :typeData="data['kvmhost']"
              :openRowAfterSearch="data['kvmOpenRows']"
              v-if="data['kvmhost'] && data['kvmhost'].length > 0"
            />

            <ExadataTypes
              typeName="DOM0"
              :typeData="data['dom0']"
              :openRowAfterSearch="data['domOpenRows']"
              v-if="data['dom0'] && data['dom0'].length > 0"
            />

            <ExadataTypes
              typeName="BARE METAL"
              :typeData="data['baremetal']"
              v-if="data['baremetal'] && data['baremetal'].length > 0"
            />

            <template v-if="data['ibswitch'].length === 0">
              <p class="subHeader">RDMA over Converged Ethernet (RoCE)</p>
              <span />
              <span />
            </template>

            <ExadataTypes
              typeName="IBSWITCH"
              :typeData="data['ibswitch']"
              v-if="data['ibswitch'] && data['ibswitch'].length > 0"
            />

            <ExadataTypes
              typeName="STORAGE"
              :typeData="data['storagecell']"
              :openRowAfterSearch="data['stoOpenRows']"
              v-if="data['storagecell'] && data['storagecell'].length > 0"
            />
          </BoxContent>
        </b-tab-item>
      </b-tabs>
    </template>
  </article>
</template>

<script>
import { mapGetters } from 'vuex'
import tooltipMixin from '@/mixins/tooltipMixin.js'
import HighlightSearchMixin from '@/mixins/highlightSearch.js'
import BoxContent from '@/components/common/BoxContent.vue'
import GhostLoading from '@/components/common/GhostLoading.vue'
import SearchInput from '@/components/common/SearchInput.vue'
// import ExportButton from '@/components/common/ExportButton.vue'
import ExadataProgress from '@/components/exadata/exadatas/ExadataProgress.vue'
import ExadataTypes from '@/components/exadata/exadatas/ExadataTypes.vue'

export default {
  mixins: [tooltipMixin, HighlightSearchMixin],
  components: {
    BoxContent,
    GhostLoading,
    SearchInput,
    // ExportButton
    ExadataProgress,
    ExadataTypes,
  },
  data() {
    return {
      exadataSearchTherm: '',
    }
  },
  computed: {
    ...mapGetters([
      'getExadataList',
      'getExadataListData',
      'loadingTableStatus',
    ]),
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
  font-weight: 900;
  margin: 2px 0 0 0 !important;

  & + span {
    display: block;
    width: 100%;
    height: 30px;
    background-color: #101336;

    & + span {
      display: block;
      width: 100%;
      height: 30px;
      background-color: #fff;
    }
  }
}
</style>
