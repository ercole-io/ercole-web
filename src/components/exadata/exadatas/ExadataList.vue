<template>
  <article>
    <div class="columns mt-3" style="margin-right: -28px">
      <GhostLoading
        :isLoading="loadingTableStatus"
        setHeight="600"
        class="column is-2"
        v-if="loadingTableStatus"
      />
      <GhostLoading
        :isLoading="loadingTableStatus"
        setHeight="600"
        class="column"
        v-if="loadingTableStatus"
      />

      <b-tabs
        size="is-small"
        type="is-toggle"
        destroy-on-hide
        vertical
        animated
        expanded
        class="column is-12 vertical-tabs-scroll"
        v-if="!loadingTableStatus"
      >
        <b-tab-item
          v-for="data in getExadata(exadataSearchTherm)"
          :value="data['exadata']"
          :label="data['exadata']"
          :key="data['exadata']"
          style="margin-top: -20px"
        >
          <BoxContent
            :title="`${data['exadata']} - ${data['_id']}`"
            border
            :key="`${data['_id']}`"
            customStyle="padding: 5px 0.5rem"
            customStyleTitle="margin-bottom: 0"
            hasHighlight
            hasShadow
            :mbottom="false"
          >
            <span slot="customTitle" v-html="highlight(data['machineType'])" />
            <span
              slot="customSubTitle"
              class="is-flex is-justify-content-flex-end is-size-7 py-2 pr-1"
            >
              last update: <b>{{ setDateTime(data['update']) }}</b>
            </span>

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
    </div>

    <NoContent
      class="column is-12"
      style="height: 370px; background-color: #eeeeee"
      v-if="getExadata(exadataSearchTherm).length === 0 && !loadingTableStatus"
    />
  </article>
</template>

<script>
import { mapGetters } from 'vuex'
import formatDateTime from '@/filters/formatDateTime.js'
import tooltipMixin from '@/mixins/tooltipMixin.js'
import HighlightSearchMixin from '@/mixins/highlightSearch.js'
import BoxContent from '@/components/common/BoxContent.vue'
import GhostLoading from '@/components/common/GhostLoading.vue'
import NoContent from '@/components/common/NoContent.vue'
// import ExportButton from '@/components/common/ExportButton.vue'
import ExadataProgress from '@/components/exadata/exadatas/ExadataProgress.vue'
import ExadataTypes from '@/components/exadata/exadatas/ExadataTypes.vue'

export default {
  name: 'exadata-list-component',
  mixins: [tooltipMixin, HighlightSearchMixin],
  props: {
    exadataSearchTherm: {
      type: String,
      default: '',
    },
  },
  components: {
    BoxContent,
    GhostLoading,
    NoContent,
    // ExportButton
    ExadataProgress,
    ExadataTypes,
  },
  methods: {
    setDateTime(val) {
      return formatDateTime(val)
    },
  },
  computed: {
    ...mapGetters(['getExadata', 'loadingTableStatus']),
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
